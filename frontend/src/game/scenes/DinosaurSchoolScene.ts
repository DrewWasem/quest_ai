import Phaser from 'phaser';
import EventBus from '../EventBus';
import { SceneScriptPlayer } from '../SceneScriptPlayer';
import { preloadGameAssets } from '../AssetLoader';
import type { SceneScript } from '../../types/scene-script';

export class DinosaurSchoolScene extends Phaser.Scene {
  private scriptPlayer!: SceneScriptPlayer;
  private instructionText!: Phaser.GameObjects.Text;
  private narrationText!: Phaser.GameObjects.Text | null;
  private isPlaying = false;

  constructor() {
    super('DinosaurSchoolScene');
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    if (this.textures.exists('classroom')) {
      this.add.image(512, 288, 'classroom').setOrigin(0.5);
    } else {
      this.cameras.main.setBackgroundColor('#1a2a0a');
      this.drawClassroomBackground();
    }

    this.add.text(
      this.cameras.main.centerX, 50,
      "Dinosaur's First Day of School",
      { fontSize: '30px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontStyle: '800' },
    ).setOrigin(0.5);

    this.spawnTrex();

    this.instructionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 40,
      'Everything is too small for the T-Rex! How can you help?',
      { fontSize: '16px', color: '#8B7AAE', fontFamily: 'Nunito, sans-serif' },
    ).setOrigin(0.5);

    this.narrationText = null;
    this.scriptPlayer = new SceneScriptPlayer(this);
    EventBus.on('play-script', this.handleScript, this);
    EventBus.emit('scene-ready', this);
  }

  private drawClassroomBackground() {
    const gfx = this.add.graphics();
    // Floor
    gfx.fillStyle(0x3a2a1a, 1);
    gfx.fillRect(0, 420, 1024, 156);
    // Chalkboard
    gfx.fillStyle(0x1a3a2a, 1);
    gfx.fillRoundedRect(300, 100, 424, 200, 8);
    gfx.lineStyle(3, 0x8a6a3a, 0.8);
    gfx.strokeRoundedRect(300, 100, 424, 200, 8);
    // Chalk text
    this.add.text(512, 180, 'Welcome T-Rex!', {
      fontSize: '24px', color: '#ccddcc', fontFamily: 'Nunito, sans-serif',
    }).setOrigin(0.5).setAlpha(0.7);
    // Desk rows
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        gfx.fillStyle(0x5a4a3a, 1);
        gfx.fillRoundedRect(180 + col * 180, 340 + row * 50, 100, 35, 4);
      }
    }
  }

  private spawnTrex() {
    const cx = 180;
    const cy = this.cameras.main.centerY + 60;

    if (this.textures.exists('trex')) {
      const img = this.add.image(cx, cy, 'trex');
      img.setScale(140 / img.height);
    } else {
      const gfx = this.add.graphics();
      // Body
      gfx.fillStyle(0x4a8a3a, 1);
      gfx.fillRoundedRect(cx - 45, cy - 60, 90, 120, 14);
      // Head
      gfx.fillStyle(0x5a9a4a, 1);
      gfx.fillRoundedRect(cx - 25, cy - 85, 50, 35, 10);
      // Eyes
      gfx.fillStyle(0xffffff, 1);
      gfx.fillCircle(cx - 8, cy - 72, 6);
      gfx.fillCircle(cx + 8, cy - 72, 6);
      gfx.fillStyle(0x000000, 1);
      gfx.fillCircle(cx - 8, cy - 72, 3);
      gfx.fillCircle(cx + 8, cy - 72, 3);
      // Teeth
      gfx.fillStyle(0xffffff, 1);
      for (let i = 0; i < 4; i++) {
        gfx.fillTriangle(cx - 15 + i * 10, cy - 55, cx - 10 + i * 10, cy - 48, cx - 20 + i * 10, cy - 48);
      }
      this.add.text(cx, cy + 75, 'T-Rex', {
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
      console.error('[DinosaurSchoolScene] Script error:', err);
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
      const emojis = ['🦕', '📚', '⭐', '🎉', '✏️', '✨'];
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
      const q = this.add.text(w / 2, h / 2, '🦖', { fontSize: '64px' }).setOrigin(0.5).setAlpha(0);
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
