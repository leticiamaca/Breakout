import { Actor, CollisionType, Color, Engine, vec } from "excalibur";
// 1 - Criar uam instancia de engine, que representa o jogo
const game = new Engine({
  width: 800,
  height: 600, //colocando o tamanho do nosso game
});

// 2 - Criar barra do player
//todo objeto,npc,player aqui no excalibur é actor, depois que você digitou o actor dê um enter que ele irá fazer o import automático e depois coloca o parenteses
const barra = new Actor({
  x: 150,
  //altura do game -40
  y: game.drawHeight - 40,
  width: 200,
  height: 20,
  //importando as cores do excalibur
  color: Color.Chartreuse,
});

//mecanica da parte de fisica é no body
//Define o tipo de colisão da barra
//Collision.Type.Fixed = significa que ele não irá se mexer quando colidir
barra.body.collisionType = CollisionType.Fixed;

// adicionando as alterações no game, mais precisamente a barra que colocamos no código
game.add(barra);

// 3 - Movimentar a barra de acordo com a posição do mouse
game.input.pointers.primary.on("move", (event) => {
  barra.pos.x = event.worldPos.x; //posição x da barra seja a mesma posição do que chamou o evento move que foi o mouse, ou seja será a mesma posição do mouse
});

//4 - Criar o Actor bolinha
const bolinha = new Actor({
  x: 100,
  y: 300,
  radius: 10,
  color: Color.Red,
});

bolinha.body.collisionType = CollisionType.Passive; //não reage a colisão mas detecta um tipo de colisão

//CollisionType.Active //A bolinha reage a colisão

// 5 Criar movimento da bolinha
const velocidadeBolinha = vec(100, 100);
setTimeout(
  () => {
    //espera um determinado tempo para disparar a função
    bolinha.vel = velocidadeBolinha;
  },
  1000 //unidade de mili segundos
);

// 6 - Fazer bolinha rebater na parede
bolinha.on("postupdate", () => {
  // Se a bolinha colidir com o lado esquerdo
  if (bolinha.pos.x < bolinha.width / 2) {
    bolinha.vel.x = velocidadeBolinha.x;
  }
  //Se a bolinha colidir com o lado direito
  if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
    bolinha.vel.x = -velocidadeBolinha.x;
  }
  //Se a bolinha colidir com o canto superior
  if (bolinha.pos.y < bolinha.height / 2) {
    bolinha.vel.y = velocidadeBolinha.y;
  }

//   // Se a bolinha colidir com o canto inferior
//   if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight)// aqui se a altura da bolinha dor menor que 150 significa que ela colidiu 
//   {
//     bolinha.vel.y = -velocidadeBolinha.y

	
//   }
});

// adicionando a bolinha
game.add(bolinha);

// 7 Criar os blocos 
const padding = 20
const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const corBloco = [Color.Violet, Color.Orange, Color.Yellow] // Para chamar a configuração color escreva color e depois dê um enter para ele ficar verde, pois se não, não dá certo

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas) //drawWidth largura total
// const larguraBloco = 136
const alturaBloco = 30

const listaBlocos: Actor[] = []



//iniciando o game
game.start();
