import Phaser from 'phaser';
import EventBus from '../EventBus';
import { SceneScriptPlayer } from '../SceneScriptPlayer';
import { preloadGameAssets } from '../AssetLoader';
import type { SceneScript } from '../../types/scene-script';

export class WizardKitchenScene extends Phaser.Scene {
  private scriptPlayer!: SceneScriptPlayer;
  private instructionText!: Phaser.GameObjects.Text;
  private narrationText!: Phaser.GameObjects.Text | null;
  private isPlaying = false;

  constructor() {
    super('WizardKitchenScene');
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    if (this.textures.exists('wizard-kitchen')) {
      this.add.image(512, 288, 'wizard-kitchen').setOrigin(0.5);
    } else {
      this.cameras.main.setBackgroundColor('#1a0533');
      this.drawKitchenBackground();
    }

    this.add.text(
      this.cameras.main.centerX, 50,
      "Wizard's Kitchen Disaster",
      { fontSize: '32px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontStyle: '800' },
    ).setOrigin(0.5);

    this.spawnWizard();

    this.instructionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 40,
      'The kitchen is alive! How will you fix the chaos?',
      { fontSize: '16px', color: '#8B7AAE', fontFamily: 'Nunito, sans-serif' },
    ).setOrigin(0.5);

    this.narrationText = null;
    this.scriptPlayer = new SceneScriptPlayer(this);
    EventBus.on('play-script', this.handleScript, this);
    EventBus.emit('scene-ready', this);
  }

  private drawKitchenBackground() {
    const gfx = this.add.graphics();
    // Floor
    gfx.fillStyle(0x2a1a4a, 1);
    gfx.fillRect(0, 420, 1024, 156);
    // Counter
    gfx.fillStyle(0x3a2a5a, 1);
    gfx.fillRect(50, 320, 924, 100);
    gfx.lineStyle(2, 0x5a4a7a, 0.6);
    gfx.strokeRect(50, 320, 924, 100);
    // Cabinets
    for (let x = 80; x < 960; x += 140) {
      gfx.fillStyle(0x4a3a6a, 1);
      gfx.fillRoundedRect(x, 140, 120, 170, 6);
      gfx.lineStyle(1, 0x6a5a8a, 0.5);
      gfx.strokeRoundedRect(x, 140, 120, 170, 6);
    }
    // Floating sparkle hints
    for (let i = 0; i < 8; i++) {
      const x = 100 + Math.random() * 824;
      const y = 100 + Math.random() * 200;
      this.add.text(x, y, '✨', { fontSize: '14px' }).setAlpha(0.4);
    }
  }

  private spawnWizard() {
    const cx = 200;
    const cy = this.cameras.main.centerY + 40;

    if (this.textures.exists('wizard')) {
      const img = this.add.image(cx, cy, 'wizard');
      img.setScale(120 / img.height);
    } else {
      const gfx = this.add.graphics();
      gfx.fillStyle(0x6c3fc5, 1);
      gfx.fillRoundedRect(cx - 40, cy - 50, 80, 100, 14);
      // Hat
      gfx.fillStyle(0x4a2a8a, 1);
      gfx.fillTriangle(cx, cy - 90, cx - 35, cy - 45, cx + 35, cy - 45);
      // Eyes
      gfx.fillStyle(0xffffff, 1);
      gfx.fillCircle(cx - 12, cy - 20, 8);
      gfx.fillCircle(cx + 12, cy - 20, 8);
      gfx.fillStyle(0x000000, 1);
      gfx.fillCircle(cx - 12, cy - 20, 4);
      gfx.fillCircle(cx + 12, cy - 20, 4);
      this.add.text(cx, cy + 65, 'Wizard', {
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
      console.error('[WizardKitchenScene] Script error:', err);
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
      const emojis = ['✨', '🧙‍♂️', '⭐', '🎉', '🍳', '💫'];
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
      const q = this.add.text(w / 2, h / 2, '🧙‍♂️', { fontSize: '64px' }).setOrigin(0.5).setAlpha(0);
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
