# Asset Inventory

Three lists: (1) assets loaded into the app, (2) assets only in the model zips, (3) poly.pizza bundles.

---

## Part 1: Assets Loaded Into the App

Everything under `frontend/public/assets/` — deployed with the build.
**Total: ~7,834 3D models + ~100 2D/audio assets (1.3 GB)**

### 3D Characters (41 GLB) — `kaykit/characters/`

All use Rig_Medium skeleton. Referenced in `asset-manifest.ts`.

| Character | File | Used In Code |
|-----------|------|:---:|
| Knight | Knight.glb | Yes |
| Barbarian | Barbarian.glb | Yes |
| Barbarian (Large) | Barbarian_Large.glb | No |
| Mage | Mage.glb | Yes |
| Ranger | Ranger.glb | Yes |
| Rogue | Rogue.glb | Yes |
| Rogue Hooded | Rogue_Hooded.glb | Yes |
| Druid | Druid.glb | Yes |
| Engineer | Engineer.glb | Yes |
| Skeleton Warrior | Skeleton_Warrior.glb | Yes |
| Skeleton Mage | Skeleton_Mage.glb | Yes |
| Skeleton Rogue | Skeleton_Rogue.glb | Yes |
| Skeleton Minion | Skeleton_Minion.glb | Yes |
| Skeleton Golem | Skeleton_Golem.glb | Yes |
| Necromancer | Necromancer.glb | Yes |
| Space Ranger | SpaceRanger.glb | Yes |
| Space Ranger (Flight) | SpaceRanger_FlightMode.glb | Yes |
| Ninja | Ninja.glb | Yes |
| Clown | Clown.glb | Yes |
| Robot One | Robot_One.glb | Yes |
| Robot Two | Robot_Two.glb | Yes |
| Survivalist | Survivalist.glb | Yes |
| Witch | Witch.glb | Yes |
| Vampire | Vampire.glb | Yes |
| Black Knight | BlackKnight.glb | Yes |
| Superhero | Superhero.glb | Yes |
| Caveman | Caveman.glb | Yes |
| Frost Golem | FrostGolem.glb | Yes |
| Paladin | Paladin.glb | No |
| Paladin (Helmet) | Paladin_with_Helmet.glb | No |
| Werewolf Man | Werewolf_Man.glb | No |
| Werewolf Wolf | Werewolf_Wolf.glb | No |
| Animatronic Normal | Animatronic_Normal.glb | No |
| Combat Mech | CombatMech.glb | No |
| Protagonist A | Protagonist_A.glb | No |
| Protagonist B | Protagonist_B.glb | No |
| Hiker | Hiker.glb | No |
| Tiefling | Tiefling.glb | No |
| Helper A | Helper_A.glb | No |
| Helper B | Helper_B.glb | No |
| Clanker | Clanker.glb | No |

### 3D Animation Packs (14 GLB) — `kaykit/animations/`

139 total animation clips across 8 Rig_Medium GLBs + 6 Rig_Large GLBs.

| Pack | Rig_Medium File | Rig_Large File | Clips |
|------|----------------|----------------|------:|
| General | Rig_Medium_General.glb | Rig_Large_General.glb | 14 |
| Movement Basic | Rig_Medium_MovementBasic.glb | Rig_Large_MovementBasic.glb | 11 |
| Movement Advanced | Rig_Medium_MovementAdvanced.glb | Rig_Large_MovementAdvanced.glb | 12 |
| Combat Melee | Rig_Medium_CombatMelee.glb | Rig_Large_CombatMelee.glb | 21 |
| Combat Ranged | Rig_Medium_CombatRanged.glb | — | 19 |
| Simulation | Rig_Medium_Simulation.glb | Rig_Large_Simulation.glb | 13 |
| Special | Rig_Medium_Special.glb | Rig_Large_Special.glb | 13 |
| Tools | Rig_Medium_Tools.glb | — | 28 |

### KayKit Packs (3,740 GLTF) — `kaykit/packs/`

| Pack | Models | Used in Code |
|------|-------:|:---:|
| forest_nature | 1,588 | Yes (8 models) |
| platformer | 525 | No |
| medieval_hex | 404 | Yes (~75 models) |
| dungeon | 283 | Yes (~30 models) |
| restaurant | 225 | Yes (~20 models) |
| holiday | 138 | Yes (6 models) |
| resource | 132 | No |
| halloween | 102 | Yes (1 model) |
| furniture | 74 | Yes (5 models) |
| city_builder | 73 | No |
| rpg_tools | 69 | Yes (3 models) |
| space_base | 69 | Yes (~20 models) |
| block | 58 | No |

### Tiny Treats Packs (803 GLTF) — `tiny-treats/`

| Pack | Models | Used in Code |
|------|-------:|:---:|
| playful-bedroom | 149 | No |
| charming-kitchen | 118 | Yes (~20 models) |
| bakery-interior | 114 | Yes (1 model) |
| house-plants | 113 | No |
| bubbly-bathroom | 84 | No |
| bakery-building | 50 | No |
| fun-playground | 47 | Yes (~18 models) |
| pleasant-picnic | 41 | Yes (~10 models) |
| baked-goods | 32 | Yes (6 models) |
| pretty-park | 28 | Yes (~15 models) |
| homely-house | 27 | No |

### Living Room Pack (187 GLTF) — `living-room/`

| Pack | Models | Used in Code |
|------|-------:|:---:|
| living-room | 187 | Yes (1 model: book_stack) |

### Cartoon City (45 GLB + 9 textures) — `cartoon-city/`

Extracted from Cartoon_City_Free_glb.zip, excluding buildings and combined scenes.

**Vehicles (6):** Car_06, Car_13, Car_16, Car_19, Futuristic_Car_1, Van
**Street furniture (13):** Bus_Stop_02, Fountain_03, Signboard_01, Spotlight_01-02, traffic_light_001-003, Billboard_2x1_03/05, Billboard_4x1_03/04, Graffiti_03
**Vegetation (4):** Bush_06, Bush_07, Bush_10, Palm_03
**Roads (7):** road_001/003/009/013/019/020/022
**Tiles (5):** Set_B_Tiles_01/04/05/06/09
**Trash/bins (10):** Trash_02-06, Trash_Can_04-08
**Textures (9):** Banners, Graffiti, Road_Signs, Roads, scrolling text, Textures1, Tiles_2 + normal/roughness

### Quaternius Animals (7 GLB) — `quaternius/animals/`

| Model | File |
|-------|------|
| Cat | kitty_001.glb |
| Dog | dog_001.glb |
| Horse | horse_001.glb |
| Chicken | chicken_001.glb |
| Deer | deer_001.glb |
| Penguin | pinguin_001.glb |
| Tiger | tiger_001.glb |

### Quaternius Food (25 GLB) — `quaternius/food/`

apple, banana, burger, carrot, chips, coffee, donut, drink, eggplant, fish, fork, ice_cream_dish, peach, Plate, sandwich, sausages, sushi_dish, tomato, wineglass, yogurt — plus 5 variant files (coffee_002, drink_002-004, wineglass_002)

### Quaternius Christmas (90 GLB) — `quaternius/christmas/`

All 90 models from the Christmas Pack Free are deployed:
Furniture (armchairs, bed, couch, tables, shelves, nightstand), Christmas decor (tree indoor/outdoor, socks, presents x6, sugar canes, snowman, advent wreath, garland), Kitchen (stove, sink, cabinets, fridge, table), Fireplace set (fireplace, coal, fire, firewood, pipe), Santa (animated), Walls/Floors/Roof/Windows, Decorations (clocks, lights, paintings), Kitchenware (plates, bowls, cups, teapot, utensils, spices, salt shaker)

**16 models referenced in code** (christmas_tree, snowman, present x3, candy_cane, wreath, garland, stocking, fireplace, cookie, teapot, bowl, cup, armchair, couch). The other 74 are deployed but unused.

### Quaternius Nature (73 GLTF) — `quaternius/nature/`

Trees: BirchTree x5, CommonTree x5, DeadTree x10, Pine x2, Tree, Tree_Fruit
Bushes: Bush, Bush_Common_Flowers, Bush_Flowers, Bush_Fruit, Bush_Large, Bush_Large_Flowers, Bush_Small, Bush_Small_Flowers
Grass: Grass x3, Grass_Common_Short/Tall, Grass_Wispy_Short/Tall
Flowers: Flower_1, Flower_1_Clump, Flower_3_Group/Single, Flower_4_Group/Single, Fruit, Clover x2, Fern_1
Rocks: Pebble_Round x5, Pebble_Square x6, Rock x2, RockPlatform_Tall, RockPlatforms x4
Mushrooms: Mushroom_Common, Mushroom_Laetiporus
Sky: Cloud x3

### Quaternius Creatures (68 GLTF) — `quaternius/creatures/`

Alien, Alien_Tall, Alpaking, Alpaking_Evolved, Armabee, Armabee_Evolved, Bat, Bee, Birb, BlueDemon, Bunny, Cactoro, Cactus, Cat, Chick, Chicken, Crab, Cthulhu, Cyclops, Deer, Demon, Dino, Dog, Dragon, Dragon_Evolved, Enemy, Fish, Frog, Ghost, Ghost_Skull, Giant, Glub, Glub_Evolved, Goblin, Goleling, Goleling_Evolved, GreenBlob, GreenDemon, GreenSpikyBlob, Hedgehog, Horse, Hywirl, Monkroose, Mushnub, Mushnub_Evolved, Mushroom, MushroomKing, Ninja, Orc, Orc_Skull, Panda, Penguin, Pig, Pigeon, PinkBlob, Raccoon, Sheep, Skeleton, Skeleton_Armor, Skull, Squidle, Tree, Tribal, Wizard, Wolf, YellowDragon, Yeti, Zombie

### Quaternius Characters Extra (65 GLTF) — `quaternius/characters-extra/`

People: BaseCharacter, Casual_Bald, Casual_Female/Male, Casual2_Female/Male, Casual3_Female/Male, Chef_Female/Male, Chef_Hat, Cowboy_Female/Male, Cowboy_Hair, Doctor_Female_Old/Young, Doctor_Male_Old/Young, Elf, Goblin_Female/Male, Kimono_Female/Male, Knight_Golden_Female/Male, Knight_Male, Ninja_Female/Male/Male_Hair, Ninja_Sand_Female/Sand, OldClassy_Female/Male, Pirate_Female/Male, Suit_Female/Male, Viking_Female/Male, VikingHelmet, Witch, Wizard, Worker_Female/Male
Animals: Alpaca, Bull, Cow, Deer, Donkey, Fox, Horse, Horse_White, Husky, Pug, ShibaInu, Stag, Wolf
Mechs/Astronauts: Astronaut_BarbaraTheBee/FernandoTheFlamingo/FinnTheFrog/RaeTheRedPanda, Mech_BarbaraTheBee/FernandoTheFlamingo/FinnTheFrog/RaeTheRedPanda

### Quaternius Medieval Props (74 GLTF) — `quaternius/medieval-props/`

Furniture: Bed_Twin x2, Bench, Bookcase_2, Chair_1, Nightstand_Shelf, Stool, Table_Large, Workbench, Workbench_Drawers
Storage: Bag, Barrel, Barrel_Apples, Barrel_Holder, Bucket_Metal, Bucket_Wooden_1, Chest_Wood, Crate_Metal, Crate_Wooden, FarmCrate_Apple/Carrot/Empty
Books: Book_5/7, Book_Simplified_Single, Book_Stack x2, BookGroup_Medium x3, BookGroup_Small x3, BookStand
Decor: Banner x2, Banner_Cloth x2, Candle x2, CandleStick, CandleStick_Stand/Triple, Lantern_Wall, Torch_Metal, Vase x2, Vase_Rubble_Medium, Shelf x3, SmallBottle, SmallBottles_1, Bottle_1
Kitchen: Cauldron, Mug, Pot_1, Pot_1_Lid, Potion x3, Scroll x2, Table_Fork/Knife/Plate/Spoon
Items: Anvil, Anvil_Log, Coin, Coin_Pile x2, Key_Gold, Key_Metal

### Quaternius Japanese Food (36 GLTF) — `quaternius/japanese-food/`

Dishes (15): Chukaman, Dango, EbiNigiri, Gyoza, MaguroNigiri, OctopusNigiri, Onigiri, Ramen, Roll, SalmonNigiri, SalmonRoll, SeaUrchinRoll, TamagoNigiri, Udon, Wasabi
Ingredients (21): Avocado, Crabsticks, Cucumber, Ebi, Eel, Fish, FishFillet, Flounder, Mackerel, Nori, Octopus, Rice, Salmon, SalmonFish, SeaUrchin, SeaUrchinOpen, Shimesaba, SlicedCucumber, Squid, Tentacle, Tuna

### Quaternius Fantasy (51 GLTF) — `quaternius/fantasy/`

Card game models (33): Card_Back/Container/Front/Mask, Fireball, TrenchcoatMushrooms, Monk, Market, Steal, King, StinkTrap, LightningWizard, Hypnosis, Beehive, Polinization, Mimic, SeaMonster, Coin, Cult, Belltowers, Rebirth, WaterDragon, OceanTreasure, Element_Fire/Lightning/Air/Water/Dark/Earth, Book, RollDice, Block, Wizard
Characters (16): Anne, Captain_Barbarossa, Henry, Mako, Shark, Sharky, Skeleton_Headless, Skeleton, Tentacle, Cleric, Enemy_Tentacle, Monk, Ranger, Rogue, Warrior, Wizard
Ships (2): Ship_Large, Ship_Small

### Quaternius Vehicles (21 GLTF) — `quaternius/vehicles/`

Cars: Bob, Challenger, Dispatcher, Executioner, Imperial, Insurgent, Omen, Pancake, Spitfire, Striker, Zenith, Vehicle_Pickup/Sports/Truck
Space: Rover_1, Rover_2, Rover_Round, Spaceship_BarbaraTheBee/FernandoTheFlamingo/FinnTheFrog/RaeTheRedPanda

### Quaternius Items (24 GLTF) — `quaternius/items/`

Collectibles: Coin, Gem_Blue/Green/Pink, Heart, Heart_Half, Heart_Outline, Key, Star, Star_Outline, Thunder
Props: Prop_Chest_Closed/Gold, Prop_Coins, Prop_GoldBag
UI icons: UI_ChickenLeg, UI_Gem_Blue/Green/Pink, UI_Gold, UI_Paper, UI_Rocks, UI_Wheat, UI_Wood

### Quaternius Blocks (61 GLTF) — `quaternius/blocks/`

Basic: Block_Blank/Brick/Cheese/Coal/Crate/Crystal/Diamond/Dirt/Grass/GreyBricks/Ice/Metal/Snow/Square/Stone/WoodPlanks
Brick variants: Bricks_Dark/Grey/Red/Yellow, Coal, Diamond, Dirt, Exclamation, Grass, Ice, Leaves, QuestionMark, Snow, Stone, Wood, WoodPlanks
Cubes: Cube_Bricks/Crate/Default/Exclamation/Question/Spikes + Dirt variants (1x1Center/End, Center/Corner/Side/Single + Tall) + Grass variants (same + Bottom/CornerBottom/CornerCenter/SideBottom/SideCenter + Tall)

### Quaternius Decorations (65 GLTF) — `quaternius/decorations/`

Japanese themed: Decoration_Bamboo/Bell/Carpet/Fish/Light/Painting/Painting_Small/Plant1/Plant2/SakuraFlower/SakuraTree/Sign x3/WallLight, Environment_ToriiGate
Kitchen/Restaurant: Environment_Bottle/Bottles/Bowl/Cabinet_Corner/Doors/Shelves x2/CanFridge/Chair x2/ChukamanSteamer/Counter variants x6/CuttingTable/Fridge/KitchenKnives/Oven/Pan/Plate/Pot x4/Sofa/Stool/Table/WoodenBeam/WoodenBoard
Floors: Floor_Kitchen1/2, Floor_Tiles, Floor_Wood, Floor_Wood_Broken
Walls: Wall_Door, Wall_Normal, Wall_RedWood, Wall_Shelves, Wall_Shoji, Wall_Shoji_Interior, Wall_Stains
Other: Truck

### Quaternius Game Mechanics (59 GLTF) — `quaternius/game-mechanics/`

Movement: Arrow, Arrow_Side, Arrow_Up, Bouncer, Bridge_Modular/Center, Bridge_Small, Cart, Rail_Corner/Incline/Straight, Stairs x3, Stairs_Modular x3
Interact: Button, Cannon, Cannonball, Chest_Closed/Open/Chest, Crystal_Big/Small, Door, Door_Closed, Key, Lever/Left/Right
Hazards: Hazard_Cylinder/Saw/SpikeTrap, Spikes, SpikyBall
Structure: Fence x5, Goal_Flag, Numbers_0-9, Pipe_90/End/Straight/T, Plant_Large/Small, Tower

### Poly.pizza Bundles (2,285 GLB) — `poly-pizza/`

#### Animals (108 GLB) — `poly-pizza/animals/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| animal-kit | 25 | 3.5M |
| animated-animal-pack | 12 | 12M |
| animated-fish-bundle | 52 | 6.5M |
| animated-dinosaur-bundle | 6 | 1.9M |
| australian-animals | 6 | 7.4M |
| farm-animal-pack | 7 | 1.6M |

#### Food (524 GLB) — `poly-pizza/food/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| cooking-assets | 130 | 4.8M |
| food-kit | 148 | 2.6M |
| ultimate-food-pack | 50 | 1.5M |
| sushi-restaurant-kit | 86 | 8.0M |
| restaurant-bits | 110 | 5.3M |

#### Nature (118 GLB) — `poly-pizza/nature/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| coral-reef-kit | 6 | 1.5M |
| crystal-pack | 28 | 600K |
| tree-collection | 4 | 100K |
| stylized-nature-megakit | 68 | 85M |
| ultimate-stylized-nature | 12 | 24M |

#### Space (129 GLB) — `poly-pizza/space/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| space-bits | 24 | 2.1M |
| space-habitat-kit | 18 | 16M |
| ultimate-space-kit | 87 | 11M |

#### Interior (611 GLB) — `poly-pizza/interior/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| furniture-pack | 19 | 2.8M |
| furniture-kit | 117 | 3.0M |
| ultimate-interior-props | 111 | 4.6M |
| ultimate-house-interior | 82 | 1.8M |
| coffeehouse-lounge | 81 | 8.5M |
| office-pack | 124 | 12M |
| household-props | 77 | 2.9M |

#### Seasonal (74 GLB) — `poly-pizza/seasonal/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| christmas-kit | 11 | 2.4M |
| halloween-bits | 63 | 2.2M |

#### Vehicles (65 GLB) — `poly-pizza/vehicles/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| cars-bundle | 7 | 1.2M |
| race-kit | 40 | 22M |
| modular-train-pack | 11 | 3.0M |
| mini-skate-kit | 7 | 180K |

#### Fantasy/RPG (230 GLB) — `poly-pizza/fantasy/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| fantasy-bundle | 20 | 512K |
| ultimate-rpg-items | 55 | 2.7M |
| ultimate-monsters | 45 | 11M |
| pirate-kit | 71 | 13M |
| witch-cottage-pack | 34 | 29M |
| animated-enemies | 5 | 2.1M |

#### Platforms (138 GLB) — `poly-pizza/platforms/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| small-platformer-kit | 11 | 132K |
| platform-kit-revamped | 21 | 704K |
| ultimate-platformer-pack | 21 | 1.0M |
| cube-world-kit | 85 | 7.1M |

#### Miscellaneous (288 GLB) — `poly-pizza/misc/`

| Bundle | Models | Size |
|--------|-------:|-----:|
| concert-pack | 13 | 3.0M |
| bottles | 6 | 1.0M |
| signs-pack | 14 | 592K |
| art-studio | 6 | 420K |
| outdoor-decorations | 52 | 3.9M |
| small-camping-bundle | 7 | 132K |
| cutes-part-one | 21 | 4.5M |
| low-poly-characters | 7 | 2.0M |
| good-dino-deeds | 146 | 61M |
| premium-models-free | 7 | 4.9M |
| stylized-kit | 9 | 4.9M |

### 2D Actors (9 PNG) — `assets/actors/`

dog, fish, kid, monster, octopus, robot, squirrel, trex, wizard

### 2D Backdrops (6 files) — `assets/backdrops/`

city-street.svg, classroom.svg, party-room.svg, space.png, underwater-stage.svg, wizard-kitchen.svg

### 2D Props (32 files) — `assets/props/`

**PNG:** cake, cake-giant, cake-tiny, chair, desk, flag, fridge, keyboard, moon, pencil, pizza, pizza-soggy, plates, rocket, soup-bowl, spacesuit, stars, toaster
**SVG:** balloon, bone, drums, fire-extinguisher, flag, guitar, keyboard, lunchbox, microphone, pencil, pillow-fort, present, river, soup-bowl, spacesuit

### 2D Effects (21 PNG) — `assets/effects/`

circle, confetti-burst, exclamation, explosion-cartoon, fire-sneeze, flame, happy, heart, laugh, light, magic, music, question, sad, smoke, spark, sparkle-magic, splash, star, star2, twirl

### 2D Reactions (10 PNG) — `assets/reactions/`

confetti-burst, explosion-cartoon, fire-sneeze, hearts-float, laugh-tears, question-marks, sad-cloud, sparkle-magic, splash, stars-spin

### Sound Effects (19 OGG) — `assets/sfx/`

boing, bong, celebration, click, drop, error, funny-fail, impact, jingle-celebrate, jingle-fail, jingle-start, jingle-success, laser, partial, pop, submit, success, whoosh, zap

### UI Icons (9 PNG) — `assets/ui/`

audio-off, audio-on, checkmark, cross, home, info, settings, star, trophy

---

## Part 2: Assets Only in the Zips (Not Deployed)

Everything in `Model Zips/` that has NOT been extracted to `frontend/public/assets/`.

### The Complete KayKit Collection v3.zip (1.22 GB)

**~4,027 GLTF/GLB models total.** Most content has been extracted.

#### Remaining NOT Deployed

| Item | Notes |
|------|-------|
| Animatronic_Creepy.glb | Horror theme — not kid-friendly |
| Mannequin_Large.glb | Rig reference model only |
| Mannequin_Medium.glb | Rig reference model only |
| Rig_Large CombatRanged | Missing from zip (only 6 of 8 Rig_Large packs exist) |
| Rig_Large Tools | Missing from zip |
| Medieval Hex Units | Soldiers, archers, catapults in color variants |
| Medieval Hex Rivers | River tiles and waterless coast/river variants |
| Medieval Hex Roads | Road tiles subfolder |
| Color Variants | ~3,053 files in 8 color variants (overlap with deployed packs) |
| Adventure Props | 2.0/Assets/gltf/ folder — some may not be individually extracted |

### Creative_Character_Free_glb.zip (15.7 MB) — NOTHING DEPLOYED

**1 combined GLB** + nested `Separate_assets_glb.zip` with individual character parts. Customizable character system with mix-and-match parts.

### All in One - Quaternius[Patreon].zip (6.6 GB)

**~9,292 model files** total. The GLTF subset has been extracted (597 models). Remaining zip-only content:

| Category | Description |
|----------|-------------|
| **FBX/OBJ duplicates** | ~7,539 files in FBX and OBJ formats (same models as extracted GLTF) |
| **FPS Assets** | Guns, ammo, military enemies — intentionally excluded (not kid-friendly) |
| **Buildings** | Houses, shops, architecture — intentionally excluded per user request |
| **Modular Characters** | Hair, eyebrows, body parts (Godot/Unity formats) |
| **Additional Nature** | Palm trees, willow trees, cliffs — some overlap with extracted nature |

### Poly.pizza Zips (53 bundles, 287 MB) — `Model Zips/poly-pizza/`

All 53 downloaded bundles have been extracted to `frontend/public/assets/3d/poly-pizza/`. The zip files remain as backups. 2 bundles failed to download: "Isometric Room" and "Random Assets".

### Previously Deployed Zips (backups only)

| Zip | Status |
|-----|--------|
| Tiny_Treats_Collection_1_1.0.zip | Fully extracted (all 12 packs including Bubbly Bathroom) |
| Tiny_Treats_Lovely_Living_Room_1.0.zip | Extracted to `living-room/` |
| Food_FREE_glb.zip | Extracted to `quaternius/food/` |
| Animals_FREE_glb.zip | Extracted to `quaternius/animals/` |
| Christmas_Pack_Free_glb.zip | Extracted to `quaternius/christmas/` |
| Cartoon_City_Free_glb.zip | Extracted to `cartoon-city/` (buildings excluded) |

---

## Summary

| Source | Total Models | Deployed | Zip-Only |
|--------|------------:|----------:|---------:|
| KayKit Characters | 44 | 41 | 3 (creepy + mannequins) |
| KayKit Animations | 16 (8 Medium + 8 Large) | 14 | 2 (Ranged + Tools Large) |
| KayKit Environment Packs | ~4,027 | ~3,740 | ~287 (units, rivers, color variants) |
| Tiny Treats Collection | ~903 | ~803 | 0 (fully extracted + living-room) |
| Tiny Treats Living Room | 187 | 187 | 0 |
| Cartoon City | ~50 | 45 | 5 (buildings + combined scenes) |
| Quaternius Animals | 8 | 7 | 1 (combined) |
| Quaternius Food | 27 | 25 | 2 (combined + variant) |
| Quaternius Christmas | 92 | 90 | 2 (combined) |
| Quaternius All-in-One (new) | ~9,292 | 597 | ~8,695 (FBX/OBJ dupes, FPS, buildings) |
| Poly.pizza Bundles | 2,285 | 2,285 | 0 (all extracted) |
| Creative Character | 1+ | 0 | 1+ |
| **Totals** | **~16,932** | **~7,834** | **~8,998** |

**~46% of available model files are deployed (up from 34%). ~54% remain in zips (mostly FBX/OBJ duplicates and excluded content).**
Of the deployed models, ~250 are referenced in source code. The remaining ~7,584 are available for dynamic scene building.
