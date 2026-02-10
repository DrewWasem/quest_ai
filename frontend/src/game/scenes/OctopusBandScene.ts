import Phaser from 'phaser';
import EventBus from '../EventBus';
import { SceneScriptPlayer } from '../SceneScriptPlayer';
import { preloadGameAssets } from '../AssetLoader';
import type { SceneScript } from '../../types/scene-script';

export class OctopusBandScene extends Phaser.Scene {
  private scriptPlayer!: SceneScriptPlayer;
  private instructionText!: Phaser.GameObjects.Text;
  private narrationText!: Phaser.GameObjects.Text | null;
  private isPlaying = false;

  constructor() {
    super('OctopusBandScene');
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    if (this.textures.exists('underwater-stage')) {
      this.add.image(512, 288, 'underwater-stage').setOrigin(0.5);
    } else {
      this.cameras.main.setBackgroundColor('#0a1a3a');
      this.drawUnderwaterBackground();
    }

    this.add.text(
      this.cameras.main.centerX, 50,
      'Octopus Rock Band',
      { fontSize: '32px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontStyle: '800' },
    ).setOrigin(0.5);

    this.spawnOctopus();

    this.instructionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 40,
      'Help the octopus start a rock band!',
      { fontSize: '16px', color: '#8B7AAE', fontFamily: 'Nunito, sans-serif' },
    ).setOrigin(0.5);

    this.narrationText = null;
    this.scriptPlayer = new SceneScriptPlayer(this);
    EventBus.on('play-script', this.handleScript, this);
    EventBus.emit('scene-ready', this);
  }

  private drawUnderwaterBackground() {
    const gfx = this.add.graphics();
    // Water gradient
    gfx.fillStyle(0x0a2a4a, 1);
    gfx.fillRect(0, 0, 1024, 200);
    gfx.fillStyle(0x0a1a3a, 1);
    gfx.fillRect(0, 200, 1024, 376);
    // Sand floor
    gfx.fillStyle(0x4a3a2a, 1);
    gfx.fillRect(0, 480, 1024, 96);
    // Bubbles
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 1024;
      const y = 100 + Math.random() * 350;
      const r = 3 + Math.random() * 6;
      gfx.lineStyle(1, 0x4488aa, 0.4);
      gfx.strokeCircle(x, y, r);
    }
    // Seaweed
    for (let i = 0; i < 6; i++) {
      const x = 80 + i * 180;
      gfx.fillStyle(0x2a5a3a, 0.6);
      gfx.fillRoundedRect(x, 400, 12, 80, 6);
      gfx.fillRoundedRect(x + 8, 380, 10, 100, 6);
    }
    // Stage platform
    gfx.fillStyle(0x3a2a4a, 0.8);
    gfx.fillRoundedRect(200, 440, 624, 40, 8);
  }

  private spawnOctopus() {
    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY + 40;

    if (this.textures.exists('octopus')) {
      const img = this.add.image(cx, cy, 'octopus');
      img.setScale(120 / img.height);
    } else {
      const gfx = this.add.graphics();
      // Head
      gfx.fillStyle(0x8855aa, 1);
      gfx.fillCircle(cx, cy - 20, 40);
      // Tentacles
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const tx = cx + Math.cos(angle) * 35;
        const ty = cy + 15 + Math.sin(angle) * 20;
        gfx.fillStyle(0x7744aa, 1);
        gfx.fillRoundedRect(tx - 6, ty, 12, 35, 6);
      }
      // Eyes
      gfx.fillStyle(0xffffff, 1);
      gfx.fillCircle(cx - 14, cy - 25, 10);
      gfx.fillCircle(cx + 14, cy - 25, 10);
      gfx.fillStyle(0x000000, 1);
      gfx.fillCircle(cx - 14, cy - 25, 5);
      gfx.fillCircle(cx + 14, cy - 25, 5);
      this.add.text(cx, cy + 65, 'Octopus', {
        fontSize: '14px', color: '#B8A9D4', fontFamily: 'Nunito, sans-serif',
      }).setOrigin(0.5);
    }
  }

  async handleScript(script: SceneScript) {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.instructionText.setAlpha(0);
    this.showNarration(script.narration, script.success_level);
    try {
      await this.scriptPlayer.play(script);
      await this.postScriptEffect(script.success_level);
    } catch (err) {
      console.error('[OctopusBandScene] Script error:', err);
    }
    this.isPlaying = false;
    this.time.delayedCall(2000, () => { this.instructionText.setAlpha(1); });
  }

  private showNarration(text: string, level: string) {
    if (this.narrationText) this.narrationText.destroy();
    const color = level === 'FULL_SUCCESS' ? '#34d399' : level === 'PARTIAL_SUCCESS' ? '#fbbf24' : '#FF8C42';
    this.narrationText = this.add.text(
      this.cameras.main.centerX, 100, '',
      { fontSize: '18px', color, fontFamily: 'Nunito, sans-serif', fontStyle: 'italic', wordWrap: { width: 600 }, align: 'center' },
    ).setOrigin(0.5);
    let charIndex = 0;
    this.time.addEvent({
      delay: 35, repeat: text.length - 1,
      callback: () => { charIndex++; this.narrationText?.setText(text.slice(0, charIndex)); },
    });
  }

  private async postScriptEffect(level: string): Promise<void> {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;
    if (level === 'FULL_SUCCESS') {
      const emojis = ['🐙', '🎸', '⭐', '🎵', '🎶', '✨'];
      const particles: Phaser.GameObjects.Text[] = [];
      for (let i = 0; i < 30; i++) {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        particles.push(this.add.text(Math.random() * w, -30, emoji, { fontSize: `${18 + Math.random() * 14}px` }).setOrigin(0.5).setAlpha(0));
      }
      await Promise.all(particles.map((p, i) =>
        new Promise<void>((resolve) => {
          this.tweens.add({
            targets: p, y: h + 30, alpha: { from: 1, to: 0.3 }, angle: Math.random() * 360,
            duration: 1500 + Math.random() * 1000, delay: i * 60, ease: 'Sine.easeIn',
            onComplete: () => { p.destroy(); resolve(); },
          });
        }),
      ));
    } else if (level === 'FUNNY_FAIL') {
      this.cameras.main.shake(400, 0.01);
      const q = this.add.text(w / 2, h / 2, '🐙', { fontSize: '64px' }).setOrigin(0.5).setAlpha(0);
      await new Promise<void>((resolve) => {
        this.tweens.add({
          targets: q, alpha: { from: 1, to: 0 }, y: h / 2 - 60, scaleX: 1.5, scaleY: 1.5,
          duration: 1000, ease: 'Sine.easeOut', onComplete: () => { q.destroy(); resolve(); },
        });
      });
    }
  }

  shutdown() {
    EventBus.off('play-script', this.handleScript, this);
    this.scriptPlayer?.clear();
  }
}
