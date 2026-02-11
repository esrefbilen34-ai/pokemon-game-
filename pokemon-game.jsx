import React, { useState, useEffect } from 'react';

const POKEMONS = [
  {
    id: 1,
    name: 'Pikachu',
    type: 'Electric',
    hp: 100,
    maxHp: 100,
    attack: 25,
    defense: 15,
    speed: 30,
    image: '⚡',
    color: '#F4D03F',
    moves: [
      { name: 'Thunder Shock', power: 40, type: 'Electric' },
      { name: 'Quick Attack', power: 30, type: 'Normal' },
      { name: 'Iron Tail', power: 50, type: 'Steel' },
      { name: 'Electro Ball', power: 45, type: 'Electric' }
    ]
  },
  {
    id: 2,
    name: 'Charmander',
    type: 'Fire',
    hp: 110,
    maxHp: 110,
    attack: 28,
    defense: 12,
    speed: 25,
    image: '🔥',
    color: '#E74C3C',
    moves: [
      { name: 'Ember', power: 40, type: 'Fire' },
      { name: 'Scratch', power: 30, type: 'Normal' },
      { name: 'Flamethrower', power: 55, type: 'Fire' },
      { name: 'Dragon Rage', power: 45, type: 'Dragon' }
    ]
  },
  {
    id: 3,
    name: 'Squirtle',
    type: 'Water',
    hp: 105,
    maxHp: 105,
    attack: 22,
    defense: 20,
    speed: 22,
    image: '💧',
    color: '#3498DB',
    moves: [
      { name: 'Water Gun', power: 40, type: 'Water' },
      { name: 'Tackle', power: 30, type: 'Normal' },
      { name: 'Bubble Beam', power: 50, type: 'Water' },
      { name: 'Bite', power: 35, type: 'Dark' }
    ]
  },
  {
    id: 4,
    name: 'Bulbasaur',
    type: 'Grass',
    hp: 115,
    maxHp: 115,
    attack: 24,
    defense: 18,
    speed: 20,
    image: '🌱',
    color: '#52BE80',
    moves: [
      { name: 'Vine Whip', power: 45, type: 'Grass' },
      { name: 'Tackle', power: 30, type: 'Normal' },
      { name: 'Razor Leaf', power: 50, type: 'Grass' },
      { name: 'Poison Powder', power: 35, type: 'Poison' }
    ]
  },
  {
    id: 5,
    name: 'Eevee',
    type: 'Normal',
    hp: 95,
    maxHp: 95,
    attack: 26,
    defense: 16,
    speed: 28,
    image: '🦊',
    color: '#A97253',
    moves: [
      { name: 'Quick Attack', power: 40, type: 'Normal' },
      { name: 'Bite', power: 35, type: 'Dark' },
      { name: 'Swift', power: 45, type: 'Normal' },
      { name: 'Take Down', power: 50, type: 'Normal' }
    ]
  },
  {
    id: 6,
    name: 'Jigglypuff',
    type: 'Fairy',
    hp: 130,
    maxHp: 130,
    attack: 18,
    defense: 14,
    speed: 15,
    image: '🎵',
    color: '#F5B7B1',
    moves: [
      { name: 'Pound', power: 35, type: 'Normal' },
      { name: 'Sing', power: 25, type: 'Normal' },
      { name: 'Disarming Voice', power: 40, type: 'Fairy' },
      { name: 'Body Slam', power: 50, type: 'Normal' }
    ]
  }
];

const TYPE_EFFECTIVENESS = {
  Electric: { Water: 2, Grass: 0.5, Electric: 0.5 },
  Fire: { Grass: 2, Water: 0.5, Fire: 0.5 },
  Water: { Fire: 2, Grass: 0.5, Water: 0.5 },
  Grass: { Water: 2, Fire: 0.5, Grass: 0.5 },
  Normal: {},
  Fairy: {}
};

export default function PokemonGame() {
  const [gameState, setGameState] = useState('selection'); // selection, battle, gameOver
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [showMoves, setShowMoves] = useState(false);
  const [animating, setAnimating] = useState(false);

  const addLog = (message, type = 'info') => {
    setBattleLog(prev => [...prev, { message, type, timestamp: Date.now() }]);
  };

  const selectPokemon = (pokemon) => {
    const playerClone = { ...pokemon, hp: pokemon.maxHp };
    const enemyClone = { ...POKEMONS[Math.floor(Math.random() * POKEMONS.length)], hp: POKEMONS[Math.floor(Math.random() * POKEMONS.length)].maxHp };
    
    setPlayerPokemon(playerClone);
    setEnemyPokemon(enemyClone);
    setGameState('battle');
    setBattleLog([]);
    setPlayerTurn(true);
    addLog(`Savaş başladı! ${playerClone.name} vs ${enemyClone.name}!`, 'battle');
  };

  const calculateDamage = (attacker, defender, move) => {
    const typeMultiplier = TYPE_EFFECTIVENESS[move.type]?.[defender.type] || 1;
    const randomFactor = 0.85 + Math.random() * 0.15;
    const baseDamage = (move.power * (attacker.attack / defender.defense) * 0.5);
    return Math.floor(baseDamage * typeMultiplier * randomFactor);
  };

  const attack = (move) => {
    if (!playerTurn || animating) return;
    
    setAnimating(true);
    setShowMoves(false);

    const damage = calculateDamage(playerPokemon, enemyPokemon, move);
    const typeEffect = TYPE_EFFECTIVENESS[move.type]?.[enemyPokemon.type] || 1;
    
    let effectText = '';
    if (typeEffect > 1) effectText = ' Süper etkili!';
    if (typeEffect < 1) effectText = ' Pek etkili değil...';

    addLog(`${playerPokemon.name} ${move.name} kullandı!${effectText}`, 'player');
    
    setTimeout(() => {
      const newEnemyHp = Math.max(0, enemyPokemon.hp - damage);
      setEnemyPokemon(prev => ({ ...prev, hp: newEnemyHp }));

      if (newEnemyHp <= 0) {
        addLog(`${enemyPokemon.name} bayıldı! Kazandınız! 🎉`, 'victory');
        setWins(prev => prev + 1);
        setGameState('gameOver');
        setAnimating(false);
      } else {
        setPlayerTurn(false);
        enemyAttack();
      }
    }, 800);
  };

  const enemyAttack = () => {
    setTimeout(() => {
      const move = enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)];
      const damage = calculateDamage(enemyPokemon, playerPokemon, move);
      const typeEffect = TYPE_EFFECTIVENESS[move.type]?.[playerPokemon.type] || 1;
      
      let effectText = '';
      if (typeEffect > 1) effectText = ' Süper etkili!';
      if (typeEffect < 1) effectText = ' Pek etkili değil...';

      addLog(`Rakip ${enemyPokemon.name} ${move.name} kullandı!${effectText}`, 'enemy');

      setTimeout(() => {
        const newPlayerHp = Math.max(0, playerPokemon.hp - damage);
        setPlayerPokemon(prev => ({ ...prev, hp: newPlayerHp }));

        if (newPlayerHp <= 0) {
          addLog(`${playerPokemon.name} bayıldı! Kaybettiniz... 😢`, 'defeat');
          setLosses(prev => prev + 1);
          setGameState('gameOver');
        } else {
          setPlayerTurn(true);
        }
        setAnimating(false);
      }, 800);
    }, 1200);
  };

  const resetGame = () => {
    setGameState('selection');
    setPlayerPokemon(null);
    setEnemyPokemon(null);
    setBattleLog([]);
    setShowMoves(false);
  };

  const HPBar = ({ current, max, color }) => {
    const percentage = (current / max) * 100;
    let barColor = color;
    if (percentage < 25) barColor = '#E74C3C';
    else if (percentage < 50) barColor = '#F39C12';

    return (
      <div className="hp-bar-container">
        <div className="hp-bar-bg">
          <div 
            className="hp-bar-fill" 
            style={{ 
              width: `${percentage}%`, 
              backgroundColor: barColor,
              transition: 'width 0.5s ease-in-out'
            }}
          />
        </div>
        <div className="hp-text">{current} / {max} HP</div>
      </div>
    );
  };

  if (gameState === 'selection') {
    return (
      <div className="game-container">
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Press Start 2P', cursive, monospace; }
          
          .game-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .title {
            font-size: 48px;
            color: #FFEB3B;
            text-shadow: 4px 4px 0px #000, -2px -2px 0px #000;
            margin: 40px 0;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .subtitle {
            font-size: 18px;
            color: white;
            margin-bottom: 40px;
            text-align: center;
          }

          .pokemon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            max-width: 1200px;
            width: 100%;
          }

          .pokemon-card {
            background: white;
            border-radius: 20px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            border: 4px solid #333;
            position: relative;
          }

          .pokemon-card:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          }

          .pokemon-emoji {
            font-size: 80px;
            margin: 20px 0;
            animation: bounce 1s infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .pokemon-name {
            font-size: 20px;
            margin: 10px 0;
            color: #333;
          }

          .pokemon-type {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            color: white;
            font-size: 12px;
            margin: 10px 0;
          }

          .pokemon-stats {
            font-size: 10px;
            color: #666;
            margin-top: 10px;
          }

          .battle-screen {
            max-width: 1000px;
            width: 100%;
            background: linear-gradient(to bottom, #87CEEB 0%, #98D8C8 50%, #7CB342 100%);
            border-radius: 20px;
            padding: 30px;
            border: 6px solid #333;
            position: relative;
            margin-top: 20px;
          }

          .stats-bar {
            display: flex;
            justify-content: space-between;
            color: white;
            font-size: 16px;
            margin-bottom: 20px;
            background: rgba(0,0,0,0.5);
            padding: 15px;
            border-radius: 10px;
          }

          .battle-area {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 40px 0;
            position: relative;
          }

          .pokemon-battle {
            text-align: center;
            position: relative;
          }

          .pokemon-battle.player {
            animation: slideInLeft 0.5s;
          }

          .pokemon-battle.enemy {
            animation: slideInRight 0.5s;
          }

          @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          .pokemon-battle.attacking {
            animation: attack 0.5s;
          }

          @keyframes attack {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(30px) scale(1.1); }
          }

          .battle-emoji {
            font-size: 120px;
            margin: 20px;
            filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.3));
          }

          .pokemon-info {
            background: white;
            padding: 15px;
            border-radius: 15px;
            border: 3px solid #333;
            margin-top: 10px;
            min-width: 250px;
          }

          .hp-bar-container {
            margin: 10px 0;
          }

          .hp-bar-bg {
            background: #ddd;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            border: 2px solid #333;
          }

          .hp-bar-fill {
            height: 100%;
            transition: width 0.5s ease-in-out;
          }

          .hp-text {
            font-size: 10px;
            margin-top: 5px;
            color: #333;
          }

          .battle-log {
            background: rgba(255,255,255,0.9);
            border-radius: 15px;
            padding: 20px;
            max-height: 150px;
            overflow-y: auto;
            border: 3px solid #333;
            margin: 20px 0;
          }

          .log-entry {
            font-size: 12px;
            margin: 8px 0;
            padding: 8px;
            border-radius: 8px;
            animation: fadeIn 0.5s;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .log-entry.player { background: #E3F2FD; color: #1976D2; }
          .log-entry.enemy { background: #FFEBEE; color: #C62828; }
          .log-entry.battle { background: #FFF3E0; color: #E65100; font-weight: bold; }
          .log-entry.victory { background: #C8E6C9; color: #2E7D32; font-weight: bold; }
          .log-entry.defeat { background: #FFCDD2; color: #C62828; font-weight: bold; }

          .controls {
            display: grid;
            gap: 15px;
            margin-top: 20px;
          }

          .btn {
            padding: 20px;
            font-size: 16px;
            border: 4px solid #333;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s;
            font-family: inherit;
            font-weight: bold;
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
          }

          .btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.3);
          }

          .btn:active:not(:disabled) {
            transform: translateY(0);
          }

          .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .btn-attack {
            background: linear-gradient(135deg, #FF6B6B, #FF8E53);
            color: white;
          }

          .btn-moves {
            background: linear-gradient(135deg, #4ECDC4, #44A08D);
            color: white;
          }

          .btn-run {
            background: linear-gradient(135deg, #95A5A6, #7F8C8D);
            color: white;
          }

          .moves-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 10px;
          }

          .move-btn {
            padding: 15px;
            font-size: 12px;
            background: white;
            border: 3px solid #333;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
          }

          .move-btn:hover:not(:disabled) {
            background: #f0f0f0;
            transform: scale(1.05);
          }

          .move-power {
            display: block;
            font-size: 10px;
            color: #666;
            margin-top: 5px;
          }

          .game-over {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 20px;
            border: 6px solid #333;
            max-width: 500px;
            margin: 40px auto;
          }

          .game-over-title {
            font-size: 32px;
            margin: 20px 0;
          }

          .vs-text {
            font-size: 48px;
            color: #FFEB3B;
            text-shadow: 3px 3px 0px #000;
            animation: pulse 1s infinite;
          }
        `}</style>

        <h1 className="title">⚡ POKEMON BATTLE ⚡</h1>
        <p className="subtitle">Pokemon'unu Seç ve Savaşa Başla!</p>
        
        <div className="pokemon-grid">
          {POKEMONS.map(pokemon => (
            <div 
              key={pokemon.id} 
              className="pokemon-card"
              onClick={() => selectPokemon(pokemon)}
            >
              <div className="pokemon-emoji">{pokemon.image}</div>
              <div className="pokemon-name">{pokemon.name}</div>
              <div className="pokemon-type" style={{ backgroundColor: pokemon.color }}>
                {pokemon.type}
              </div>
              <div className="pokemon-stats">
                HP: {pokemon.maxHp} | ATK: {pokemon.attack} | DEF: {pokemon.defense} | SPD: {pokemon.speed}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'battle') {
    return (
      <div className="game-container">
        <div className="stats-bar">
          <div>🏆 Kazanma: {wins}</div>
          <div>💀 Kaybetme: {losses}</div>
        </div>

        <div className="battle-screen">
          <div className="battle-area">
            <div className={`pokemon-battle player ${animating && playerTurn ? 'attacking' : ''}`}>
              <div className="battle-emoji">{playerPokemon.image}</div>
              <div className="pokemon-info">
                <div className="pokemon-name">{playerPokemon.name}</div>
                <HPBar current={playerPokemon.hp} max={playerPokemon.maxHp} color={playerPokemon.color} />
              </div>
            </div>

            <div className="vs-text">VS</div>

            <div className={`pokemon-battle enemy ${animating && !playerTurn ? 'attacking' : ''}`}>
              <div className="battle-emoji">{enemyPokemon.image}</div>
              <div className="pokemon-info">
                <div className="pokemon-name">{enemyPokemon.name}</div>
                <HPBar current={enemyPokemon.hp} max={enemyPokemon.maxHp} color={enemyPokemon.color} />
              </div>
            </div>
          </div>

          <div className="battle-log">
            {battleLog.slice(-5).map((log, index) => (
              <div key={log.timestamp + index} className={`log-entry ${log.type}`}>
                {log.message}
              </div>
            ))}
          </div>

          <div className="controls">
            {!showMoves ? (
              <>
                <button 
                  className="btn btn-moves" 
                  onClick={() => setShowMoves(true)}
                  disabled={!playerTurn || animating}
                >
                  ⚔️ Saldırı
                </button>
                <button className="btn btn-run" onClick={resetGame}>
                  🏃 Kaç
                </button>
              </>
            ) : (
              <>
                <div className="moves-grid">
                  {playerPokemon.moves.map((move, index) => (
                    <button 
                      key={index} 
                      className="move-btn"
                      onClick={() => attack(move)}
                      disabled={!playerTurn || animating}
                    >
                      {move.name}
                      <span className="move-power">💥 {move.power} | {move.type}</span>
                    </button>
                  ))}
                </div>
                <button 
                  className="btn btn-run" 
                  onClick={() => setShowMoves(false)}
                  disabled={animating}
                >
                  ← Geri
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    const isVictory = enemyPokemon.hp === 0;
    
    return (
      <div className="game-container">
        <div className="game-over">
          <div className="game-over-title">
            {isVictory ? '🎉 KAZANDIN! 🎉' : '💀 KAYBETTİN 💀'}
          </div>
          <div style={{ fontSize: '80px', margin: '30px 0' }}>
            {isVictory ? '🏆' : '😢'}
          </div>
          <div style={{ fontSize: '16px', margin: '20px 0' }}>
            🏆 Toplam Kazanma: {wins}<br/>
            💀 Toplam Kaybetme: {losses}
          </div>
          <button className="btn btn-moves" onClick={resetGame} style={{ width: '100%', marginTop: '20px' }}>
            🔄 Yeni Oyun
          </button>
        </div>
      </div>
    );
  }
}
