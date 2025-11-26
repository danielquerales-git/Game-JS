
// Clase genérica para personajes
class GenericCharacter {
  constructor(name, hp, attack, defense, speed) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
  }
}

//Clases ecpecíficas para diferentes tipos de personajes

class Neo extends GenericCharacter {
  constructor(name, hp, attack, defense, speed) {
    super(name, hp, attack, defense, speed);
  }
  Fly() {
    this.speed = this.speed * 2;
  }
  Glasses() {
    this.attack = this.attack * 1.5;
  }
  Layer() {
    this.defense = this.defense + 15;
  }
}

class Trinity extends GenericCharacter {
  constructor(name, hp, attack, defense, speed) {
    super(name, hp, attack, defense, speed);
  }
  Christ() {
    this.hp = this.hp + 15;
  }
  Gun() {
    this.attack = this.attack + 6;
  }
  Biker() {
    this.speed = this.speed + 17;
  }
}

class Morpheus extends GenericCharacter {
  constructor(name, hp, attack, defense, speed) {
    super(name, hp, attack, defense, speed);
  }
  Captain() {
    this.defense = this.defense + 5;
  }
  BluePill() {
    this.hp = this.hp + 9;
  }
  RedPill() {
    this.attack = this.attack + 14;
  }
}

// Creacion de personajes

let srAnderson = new Neo(
  "Sr. Anderson",
  100,
  Math.round(Math.random() * 30),
  Math.round(Math.random() * 30),
  Math.round(Math.random() * 30)
);
let missTrinity = new Trinity(
  "Miss Trinity",
  87,
  Math.round(Math.random() * 30),
  Math.round(Math.random() * 30),
  Math.round(Math.random() * 30)
);
let mrMorpheus = new Morpheus(
  "Mr. Morpheus",
  91,
  Math.round(Math.random() * 30),
  Math.round(Math.random() * 30),
  Math.round(Math.random() * 30)
);

// Creacion de un array de personajes

let players = [srAnderson, missTrinity, mrMorpheus];


// FUNCION DE ATAQUE ENTRE DOS PERSONAJES (usa una habilidad aleatoria)

function Attack(attacker, defender) {

  // elegir una habilidad aleatoria disponible para el atacante
  const powers = [];
  if (attacker instanceof Neo) powers.push("Glasses", "Fly", "Layer");
  else if (attacker instanceof Trinity) powers.push("Christ", "Gun", "Biker");
  else if (attacker instanceof Morpheus) powers.push("Captain", "BluePill", "RedPill");

  let chosenPowers = null;

  if (powers.length > 0) {
    chosenPowers = powers[Math.floor(Math.random() * powers.length)];
    if (typeof attacker[chosenPowers] === "function") {
      attacker[chosenPowers]();
      console.log(
        `\n${attacker.name} uses ${chosenPowers} (${attacker.name} stats: atk=${attacker.attack}, def=${attacker.defense}, hp=${attacker.hp}, spd=${attacker.speed})`
      );
    }
  }

  // Calcular daño usando las propiedades atk y def actuales
  let damage = Math.round(attacker.attack - defender.defense);
  if (damage <= 0) damage = 1; // daño mínimo

  defender.hp = defender.hp - damage;

  console.log(
    `\n${attacker.name} attacks ${defender.name} using ${chosenPowers
     } — damage: ${damage}. ${defender.name} HP left: ${Math.max(
      defender.hp,
      0
    )}.`
  );

  // devolver si el defensor murió
  return defender.hp <= 0;
}

// INICIO BUCLE BATALLA AUTOMÁTICA
function startBattle(participants) {

  // clonamos el array de participantes
  let fighters = participants.slice();
  console.log("\n");
  console.log("=== WELCOME TO THE MATRIX ===");
  console.log("\n\n=== BATTLE START ===");
  console.log("\nStarting fighters:");
  fighters.forEach((p) =>
    console.log(
      `\n ${p.name}: HP=${p.hp}, ATK=${p.attack}, DEF=${p.defense}, SPD=${p.speed}`
    )
  );

  let round = 1;
  while (fighters.filter((p) => p.hp > 0).length > 1) {
    console.log(`\n--- Round ${round} ---`);

    // ordenar por velocidad (spd) descendente
    fighters.sort((a, b) => b.speed - a.speed);

    // recorremos en orden de velocidad
    for (let attacker of fighters.slice()) {
      // si solo queda uno vivo, terminamos
      if (fighters.filter((p) => p.hp > 0).length <= 1) break;

      if (attacker.hp <= 0) continue; // ya se murio

      // seleccionar un objetivo aleatorio distinto y con hp>0
      const targets = fighters.filter((p) => p !== attacker && p.hp > 0);
      if (targets.length === 0) break;
      const defender = targets[Math.floor(Math.random() * targets.length)];

      const died = Attack(attacker, defender);
      if (died) {
        console.log(
          `\n✨ ${defender.name} has been defeated and is removed from the battle.`
        );
        // defender will remain in array but hp<=0; we'll filter them out when checking alive count
      }
    }

    // mostrar estado al final de la ronda
    console.log("\nStatus at end of round:");
    fighters.forEach((p) =>
      console.log(
        `\n- ${p.name}: HP=${Math.max(p.hp, 0)}, ATK=${p.attack}, DEF=${
          p.defense
        }, SPD=${p.speed}`
      )
    );

    round++;
  }

  const alive = fighters.filter((p) => p.hp > 0);
  if (alive.length === 1) {
    console.log(
      `\n🏆 The winner is ${alive[0].name} with ${alive[0].hp} HP remaining!`
    );
  } else {
    console.log("\nNo winner — battle ended with no survivors.");
  }

  console.log("=== BATTLE END ===");
}

// Lanzar la batalla automática
startBattle(players);


