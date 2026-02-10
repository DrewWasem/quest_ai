import Phaser from 'phaser';
import EventBus from '../EventBus';
import { SceneScriptPlayer } from '../SceneScriptPlayer';
import { preloadGameAssets } from '../AssetLoader';
import type { SceneScript } from '../../types/scene-script';

export class DogSpaceScene extends Phaser.Scene {
  private scriptPlayer!: SceneScriptPlayer;
  private instructionText!: Phaser.GameObjects.Text;
  private narrationText!: Phaser.GameObjects.Text | null;
  private isPlaying = false;

  constructor() {
    super('DogSpaceScene');
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    if (this.textures.exists('space')) {
      this.add.image(512, 288, 'space').setOrigin(0.5);
    } else {
      this.cameras.main.setBackgroundColor('#050520');
      this.drawSpaceBackground();
    }

    this.add.text(
      this.cameras.main.centerX, 50,
      'Dog Space Mission',
      { fontSize: '32px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontStyle: '800' },
    ).setOrigin(0.5);

    this.spawnDog();

    this.instructionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 40,
      'Plan the dog\'s mission to the moon!',
      { fontSize: '16px', color: '#8B7AAE', fontFamily: 'Nunito, sans-serif' },
    ).setOrigin(0.5);

    this.narrationText = null;
    this.scriptPlayer = new SceneScriptPlayer(this);
    EventBus.on('play-script', this.handleScript, this);
    EventBus.emit('scene-ready', this);
  }

  private drawSpaceBackground() {
    const gfx = this.add.graphics();
    // Starfield
    gfx.fillStyle(0xffffff, 1);
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 576;
      const r = Math.random() * 1.5 + 0.5;
      gfx.fillCircle(x, y, r);
    }
    // Moon
    gfx.fillStyle(0xddddaa, 1);
    gfx.fillCircle(850, 120, 50);
    gfx.fillStyle(0xcccc99, 0.5);
    gfx.fillCircle(835, 110, 10);
    gfx.fillCircle(865, 130, 8);
    gfx.fillCircle(845, 140, 6);
    // Ground/launchpad
    gfx.fillStyle(0x2a2a3a, 1);
    gfx.fillRect(0, 480, 1024, 96);
    gfx.fillStyle(0x4a4a5a, 1);
    gfx.fillRect(350, 470, 324, 10);
  }

  private spawnDog() {
    const cx = 200;
    const cy = this.cameras.main.centerY + 60;

    if (this.textures.exists('dog')) {
      const img = this.add.image(cx, cy, 'dog');
      img.setScale(110 / img.height);
    } else {
      const gfx = this.add.graphics();
      // Body
      gfx.fillStyle(0xc49a6c, 1);
      gfx.fillRoundedRect(cx - 35, cy - 35, 70, 70, 14);
      // Ears
      gfx.fillStyle(0xa07a4a, 1);
      gfx.fillRoundedRect(cx - 30, cy - 55, 20, 25, 6);
      gfx.fillRoundedRect(cx + 10, cy - 55, 20, 25, 6);
      // Eyes
      gfx.fillStyle(0x000000, 1);
      gfx.fillCircle(cx - 10, cy - 10, 5);
      gfx.fillCircle(cx + 10, cy - 10, 5);
      // Nose
      gfx.fillCircle(cx, cy + 5, 4);
      // Tongue
      gfx.fillStyle(0xff6688, 1);
      gfx.fillRoundedRect(cx - 5, cy + 12, 10, 10, 5);
      this.add.text(cx, cy + 50, 'Dog', {
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
      console.error('[DogSpaceScene] Script error:', err);
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
      const emojis = ['🐕', '🚀', '⭐', '🌙', '✨', '🎉'];
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
      const q = this.add.text(w / 2, h / 2, '🐕', { fontSize: '64px' }).setOrigin(0.5).setAlpha(0);
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
