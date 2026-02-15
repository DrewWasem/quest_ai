/**
 * Zone-Specific Prop Palettes
 *
 * Maps each quest zone to its thematic subset of registered PROP_PATHS keys.
 * Vignettes should prefer these props for visual consistency within a zone.
 *
 * All keys verified against PROP_PATHS in ScenePlayer3D.tsx.
 */

// ─── SKELETON BIRTHDAY ──────────────────────────────────────────────────────
// Theme: Party, celebration, gifts, decorations, sweets
export const SKELETON_BIRTHDAY_PROPS = [
  // Party essentials
  'cake', 'cake_birthday', 'cake_chocolate', 'cupcake', 'cookie',
  'present', 'present_A_red', 'present_B_blue', 'present_C_green',
  'balloon', 'candle', 'banner_blue', 'banner_red',
  // Holiday / celebration
  'candy_bucket', 'lollipop', 'lollipop_pink', 'lollipop_orange',
  'candy_blue', 'candy_orange', 'candy_pink', 'candycorn',
  'candy_cane', 'stocking', 'garland',
  // Christmas extras (party decor)
  'christmas_tree', 'present_xmas', 'wreath',
  // Food treats
  'pie', 'donut_chocolate', 'donut_sprinkles', 'muffin', 'pancakes',
  'ice_cream', 'pudding', 'sundae', 'popsicle', 'waffle',
  'cream_puff', 'pretzel', 'macaron', 'macaron_blue', 'macaron_yellow',
  // Bakery
  'pastry_stand', 'serving_tray', 'display_case', 'counter_table',
  // Decorations
  'stars', 'heart', 'star', 'gem_blue', 'gem_green', 'gem_pink',
  // Furniture
  'table_long', 'chair', 'bench',
  // Fun extras
  'teddy_bear', 'rubber_duck', 'play_blocks', 'piggybank',
] as const

// ─── KNIGHT SPACE ────────────────────────────────────────────────────────────
// Theme: Space exploration, sci-fi tech, rockets, stations
export const KNIGHT_SPACE_PROPS = [
  // Space base (KayKit)
  'rocket', 'basemodule_A', 'basemodule_B', 'basemodule_garage',
  'cargo_A', 'solarpanel', 'dome', 'moon', 'flag', 'spacesuit',
  // Space (Poly-Pizza)
  'astronaut', 'geodesic_dome', 'space_house', 'planet', 'mech',
  // Vehicles
  'spaceship', 'spaceship_frog', 'rover',
  // Sci-fi props
  'crystal_big', 'crystal_small', 'thunder', 'fireball',
  // Tools
  'hammer', 'magnifying_glass', 'pickaxe', 'shovel', 'bucket',
  'compass', 'blueprint', 'map', 'lantern',
  // Dungeon (space station interiors)
  'torch', 'barrel', 'crate', 'chest',
  // Tech / bedroom
  'computer', 'alarm_clock',
  // Game mechanics
  'cannon', 'cannonball', 'lever', 'pipe', 'tower',
  // Nature (alien landscape)
  'rock', 'pebble', 'cloud',
] as const

// ─── MAGE KITCHEN ────────────────────────────────────────────────────────────
// Theme: Magical cooking, potions, kitchen chaos, enchanted ingredients
export const MAGE_KITCHEN_PROPS = [
  // Restaurant kitchen
  'oven', 'stove', 'pan', 'pot', 'plate', 'plates', 'teapot',
  // Bakery kitchen
  'bread_oven', 'stand_mixer', 'mixing_bowl', 'dough_roller', 'dough_ball',
  'flour_sack', 'whisk', 'scale', 'coffee_machine',
  // Kitchen tools
  'frying_pan', 'cutting_board', 'knife_block', 'kitchen_knife',
  'ladle', 'spatula', 'big_spoon', 'rolling_pin',
  // Magic/potions
  'potion', 'potion_bottle', 'potion_flask', 'cauldron_medieval',
  'candle_medieval', 'candlestick', 'candlestick_triple',
  'scroll', 'scroll_ancient', 'scroll_2', 'book', 'book_stack',
  // Japanese kitchen
  'cutting_table', 'kitchen_knives', 'japanese_bowl',
  'japanese_cabinet', 'japanese_fridge', 'japanese_oven',
  // FoodMegaPack ingredients
  'apple_fmp', 'banana_fmp', 'lemon_fmp', 'orange_fmp', 'tomato_fmp',
  'carrot_fmp', 'potato', 'onion_fmp', 'garlic', 'mushroom',
  'bell_pepper', 'broccoli_fmp', 'cucumber', 'chili_pepper',
  // Cheese & bread
  'cheddar', 'hole_cheese', 'yellow_cheese', 'white_cheese',
  'baguette_fmp', 'loaf_fmp', 'bread_round', 'croissant_fmp',
  // Meat & fish
  'bacon_fmp', 'ham', 'sausage', 'salmon', 'halibut',
  // Desserts
  'cake_fmp', 'jelly', 'honey_jar', 'jam_hex', 'jam_round',
  // Cutlery
  'fork', 'knife_fmp', 'spoon_big', 'spoon_small',
  // Poly-Pizza food
  'cheese', 'chocolate', 'honey', 'egg_cooked', 'fries',
  'burger', 'sandwich', 'taco', 'hot_dog', 'pizza_food',
  // Drinks
  'bottle_fmp', 'can', 'carton', 'cup', 'milk', 'egg',
  // Kitchen furniture
  'sink', 'fridge', 'toaster', 'counter_table',
  'cookie_jar', 'mug_bakery', 'cash_register',
] as const

// ─── BARBARIAN SCHOOL ────────────────────────────────────────────────────────
// Theme: School chaos, learning, furniture destruction, playground
export const BARBARIAN_SCHOOL_PROPS = [
  // School furniture
  'desk', 'table', 'chair', 'bookcase', 'book', 'book_stack',
  'book_stack_medieval', 'bookstand',
  // School supplies
  'pencil', 'journal', 'journal_closed', 'map', 'map_rolled',
  'blueprint', 'compass', 'scissors',
  // Learning tools
  'magnifying_glass', 'chisel', 'scale',
  // Playground
  'slide', 'swing', 'seesaw', 'sandbox', 'merry_go_round',
  'soccer_ball', 'rubiks_cube', 'play_blocks',
  // Bedroom/school items
  'computer', 'alarm_clock', 'lamp_desk', 'poster', 'closet',
  'teddy_bear', 'piggybank',
  // Dungeon (school basement vibes)
  'barrel', 'crate', 'torch', 'chest',
  // Weapons (barbarian props)
  'sword', 'shield', 'hammer', 'anvil', 'pickaxe',
  'cannon', 'cannonball',
  // Medieval learning
  'scroll', 'scroll_ancient', 'lantern', 'workbench',
  'candle_medieval', 'candlestick',
  // Furniture
  'shelf', 'stool', 'table_large', 'chair_restaurant',
  // Nature (outdoor class)
  'tree', 'bush', 'rock', 'bench', 'fountain',
  // Fun extras
  'rubber_duck', 'bathtub', 'pillow',
] as const

// ─── SKELETON PIZZA ──────────────────────────────────────────────────────────
// Theme: Pizza kitchen, cooking chaos, food fights, delivery
export const SKELETON_PIZZA_PROPS = [
  // Restaurant kitchen
  'oven', 'stove', 'pan', 'pot', 'plate', 'plates',
  // Pizza specific
  'pizza', 'pizza_pepperoni', 'pizza_cheese', 'pizza_food', 'pizza_box',
  // Kitchen tools
  'frying_pan', 'cutting_board', 'knife_block', 'kitchen_knife',
  'ladle', 'spatula', 'big_spoon', 'rolling_pin', 'whisk',
  // Bakery equipment
  'bread_oven', 'stand_mixer', 'mixing_bowl', 'dough_roller', 'dough_ball',
  'flour_sack',
  // Toppings / ingredients
  'tomato_fmp', 'bell_pepper', 'onion_fmp', 'mushroom',
  'cheese', 'cheddar', 'chili_pepper', 'broccoli_fmp',
  'bacon_fmp', 'ham', 'sausage', 'pineapple_fmp',
  'corn', 'pepper', 'olive', 'garlic',
  // Other food
  'burger', 'hot_dog', 'fries', 'taco', 'sandwich',
  'salad', 'egg_cooked', 'bread', 'baguette',
  // Delivery
  'truck', 'cart', 'pickup_truck',
  // Restaurant furniture
  'chair_restaurant', 'chair_A', 'table_long', 'counter_table',
  'cash_register', 'display_case',
  // Cutlery
  'fork', 'knife_fmp', 'spoon_big', 'spoon_small',
  // Drinks
  'bottle_fmp', 'soda', 'soda_can', 'cup',
  // Fire / chaos
  'fireball',
  // Kitchen extras
  'sink', 'fridge', 'toaster',
  'cookie_jar', 'serving_tray', 'mug_bakery',
] as const

// ─── ADVENTURERS PICNIC ──────────────────────────────────────────────────────
// Theme: Nature exploration, camping, foraging, outdoor cooking
export const ADVENTURERS_PICNIC_PROPS = [
  // Picnic essentials
  'picnic_basket', 'picnic_blanket', 'basket', 'blanket',
  'apple', 'bread', 'bottle', 'cup', 'lunchbox',
  // Nature — trees
  'tree', 'tree_large', 'birch_tree', 'common_tree', 'pine_tree',
  'dead_tree', 'fruit_tree', 'sakura_tree',
  // Nature — flora
  'bush', 'bush_flowers', 'bush_fruit', 'flower', 'flower_clump',
  'flower_group', 'fern', 'clover', 'bamboo',
  // Nature — terrain
  'rock', 'pebble', 'rock_platform', 'cloud', 'mushroom',
  // Park
  'bench', 'fountain', 'lamp', 'fence', 'sign',
  // Camping
  'lantern', 'bucket', 'shovel', 'pickaxe', 'bow',
  // Animals
  'rabbit', 'fox', 'bear', 'deer', 'bird', 'frog', 'duck',
  'sheep', 'cow', 'hedgehog', 'raccoon', 'bee',
  // Outdoor food
  'apple_fmp', 'banana_fmp', 'watermelon', 'grapes', 'cherries',
  'strawberry', 'pear', 'orange', 'lemon',
  'sandwich_food', 'salad', 'honey', 'honey_jar',
  // Creatures
  'mushroom_creature', 'crab', 'fish_creature',
  // Exploration
  'map', 'compass', 'magnifying_glass', 'journal',
  // Plants
  'cactus', 'monstera', 'potted_plant', 'succulent', 'watering_can',
  // Treasure
  'chest_closed', 'chest_gold_item', 'coin_item', 'gold_bag',
  'gem_blue', 'gem_green', 'gem_pink',
] as const

// ─── DUNGEON CONCERT ─────────────────────────────────────────────────────────
// Theme: Dungeon exploration, sneaking, traps, boss fights, music
export const DUNGEON_CONCERT_PROPS = [
  // Dungeon basics
  'torch', 'barrel', 'barrel_medieval', 'crate', 'chest', 'chest_wood',
  'chest_closed', 'chest_gold_item', 'key', 'bone',
  'banner_blue', 'banner_red', 'table_long',
  // Castle kit
  'door', 'gate_kn', 'metal-gate', 'wall', 'wall-doorway',
  'bridge-draw', 'bridge-straight', 'stairs-stone', 'tower-square',
  'siege-catapult', 'siege-ballista', 'siege-trebuchet',
  // Halloween / graveyard
  'coffin', 'grave', 'skull_candle', 'scarecrow', 'pitchfork',
  'pumpkin', 'pumpkin_jackolantern', 'wagon',
  'lantern_hanging', 'lantern_standing',
  // Medieval props
  'candle_medieval', 'candlestick', 'candlestick_triple',
  'lantern_wall', 'coin_pile', 'mug_medieval', 'workbench',
  'potion', 'potion_bottle', 'potion_flask', 'cauldron_medieval',
  'scroll', 'scroll_ancient', 'book', 'bookstand',
  // Weapons
  'sword', 'shield', 'hammer', 'anvil', 'spikes',
  // Concert / music
  'guitar', 'guitar_amp', 'drums', 'drumstick', 'keyboard',
  'microphone', 'bass_speakers', 'speaker', 'floor_monitor',
  'effects_pedal', 'headphones',
  'concert_stage', 'stage', 'spotlight', 'motorised_spotlight',
  'barricade', 'mic',
  // Game mechanics
  'lever', 'bridge', 'door_game', 'stairs', 'cannon', 'cannonball',
  // Creatures
  'ghost', 'goblin', 'skeleton_creature', 'zombie', 'bat',
  'wolf', 'orc', 'demon', 'slime',
  // Treasure
  'gold_bag', 'coin_item', 'gem_blue', 'gem_green', 'gem_pink',
] as const

// ─── ZONE PROP MAP ───────────────────────────────────────────────────────────

export const ZONE_PROPS: Record<string, readonly string[]> = {
  'skeleton-birthday': SKELETON_BIRTHDAY_PROPS,
  'knight-space': KNIGHT_SPACE_PROPS,
  'mage-kitchen': MAGE_KITCHEN_PROPS,
  'barbarian-school': BARBARIAN_SCHOOL_PROPS,
  'skeleton-pizza': SKELETON_PIZZA_PROPS,
  'adventurers-picnic': ADVENTURERS_PICNIC_PROPS,
  'dungeon-concert': DUNGEON_CONCERT_PROPS,
}

/** Get a random prop from a zone's palette */
export function getZoneProp(zone: string, category?: string): string {
  const props = ZONE_PROPS[zone]
  if (!props || props.length === 0) return 'rock'
  if (!category) return props[Math.floor(Math.random() * props.length)]
  // Filter by substring match if category given
  const filtered = props.filter(p => p.includes(category))
  if (filtered.length === 0) return props[Math.floor(Math.random() * props.length)]
  return filtered[Math.floor(Math.random() * filtered.length)]
}

/** Get N random unique props from a zone */
export function getZoneProps(zone: string, count: number): string[] {
  const props = ZONE_PROPS[zone]
  if (!props || props.length === 0) return ['rock']
  const shuffled = [...props].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
