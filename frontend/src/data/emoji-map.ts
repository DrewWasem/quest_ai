/**
 * Emoji Map — Maps semantic emotion names to Kenney Emotes Pack (CC0) filenames.
 *
 * 30 pixel-art emotes from Kenney.nl (public domain / CC0).
 * Located at: /assets/2d/emojis/kenney/
 *
 * For emotions not in the Kenney set, resolveEmojiImage() in ScenePlayer3D
 * falls back to Unicode text rendering.
 */

export const EMOJI_MAP: Record<string, string> = {
  // Faces
  happy: 'emote_faceHappy',
  angry: 'emote_faceAngry',
  sad: 'emote_faceSad',
  laughing: 'emote_laugh',

  // Hearts
  love: 'emote_heart',
  love_eyes: 'emote_hearts',
  heartbreak: 'emote_heartBroken',

  // Stars / sleep
  star_eyes: 'emote_stars',
  star: 'emote_star',
  sleeping: 'emote_sleep',

  // Symbols
  music: 'emote_music',
  musical: 'emote_music',
  idea: 'emote_idea',
  surprised: 'emote_exclamation',
  shocked: 'emote_exclamations',
  confused: 'emote_question',
  curious: 'emote_question',
  alert: 'emote_alert',
  mad: 'emote_anger',
  furious: 'emote_anger',
  crying: 'emote_drop',
  sick: 'emote_drops',
  nervous: 'emote_drops',
  cash: 'emote_cash',
  cross: 'emote_cross',
  thinking: 'emote_cloud',
  dizzy: 'emote_swirl',
  mind_blown: 'emote_swirl',

  // Aliases for common vignette emotions → best Kenney match
  excited: 'emote_exclamation',
  worried: 'emote_drops',
  scared: 'emote_exclamations',
  determined: 'emote_bars',
  heroic: 'emote_star',
  triumphant: 'emote_stars',
  proud: 'emote_star',
  grateful: 'emote_heart',
  hopeful: 'emote_star',
  playful: 'emote_faceHappy',
  cheeky: 'emote_faceHappy',
  silly: 'emote_faceHappy',
  mischievous: 'emote_faceHappy',
  grumpy: 'emote_faceAngry',
  annoyed: 'emote_faceAngry',
  stubborn: 'emote_faceAngry',
  embarrassed: 'emote_drop',
  blushing: 'emote_drop',
  hungry: 'emote_exclamation',
  yummy: 'emote_heart',
  disgusted: 'emote_faceSad',
  jealous: 'emote_faceAngry',
  sneaky: 'emote_dots3',
  suspicious: 'emote_dots3',
  unamused: 'emote_faceSad',
  exhausted: 'emote_sleep',
  frozen: 'emote_faceSad',
  ghost: 'emote_faceSad',
  party: 'emote_stars',
  cool: 'emote_star',
  wink: 'emote_faceHappy',
  smirk: 'emote_faceHappy',
  tongue_out: 'emote_laugh',
  drooling: 'emote_drop',
  pleading: 'emote_heart',
  startled: 'emote_exclamations',
}

/** Get path to a Kenney emote PNG */
export function getEmojiPath(nameOrKey: string): string {
  const key = EMOJI_MAP[nameOrKey] ?? nameOrKey
  // If key looks like a Kenney filename, use it directly
  if (key.startsWith('emote_')) {
    return `/assets/2d/emojis/kenney/${key}.png`
  }
  return ''
}

/** Get path to emote for particle effects (same Kenney pixel art) */
export function getEmojiOutlinePath(nameOrKey: string): string {
  return getEmojiPath(nameOrKey)
}

/** Get path to emote for character bubbles (same Kenney pixel art) */
export function getEmojiBubblePath(nameOrKey: string): string {
  return getEmojiPath(nameOrKey)
}
