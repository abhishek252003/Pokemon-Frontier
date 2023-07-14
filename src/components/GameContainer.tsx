import { Grid } from '@mui/material'
import GenerationPicker from '../features/generations/GenerationPicker'
import Score from '../features/gameState/Score'
import PokemonGuess from './PokemonGuess'
import GamePanel from './GamePanel'
import GameSettings from '../features/game/GameSettings'
import HealthPoints from '../features/gameState/HealthPoints'
import GameOverOverlay from './GameOverOverlay'
import GameStart from './GameStart'
import { useAppSelector } from '../redux/hooks'
import { selectGameState } from '../features/gameState/gameStateSlice'
import Tutorial from './Tutorial'

const GameContainer = () => {
  const gameState = useAppSelector(selectGameState)

  return (
    <>
      <GameOverOverlay />
      <Grid container>
        <Grid item xs={3}>
          <GamePanel>
            <GenerationPicker />
          </GamePanel>
        </Grid>
        <Grid item xs={6}>
          {gameState.isGameOver ? (
            <></>
          ) : gameState.initialized ? (
            <PokemonGuess />
          ) : (
            <GameStart />
          )}
        </Grid>
        <Grid item xs={3}>
          <GamePanel>
            <HealthPoints />
            <Score />
            <GameSettings />
          </GamePanel>
        </Grid>
      </Grid>
      <Tutorial />
    </>
  )
}

export default GameContainer
