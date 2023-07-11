import { Box, Typography } from '@mui/material'
import { useGetPokemonByIdQuery } from '../../redux/services/pokemonApi'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectPokemonIds, setRandomId } from './pokemonIdsSlice'
import PokemonFrame from './PokemonFrame'
import { clearPokemon, selectPokemon, setPokemon } from './pokemonSlice'
import {
  resetStreak,
  addStreak,
  setProgress,
  addScore,
} from '../score/scoreSlice'
import { motion, useAnimationControls } from 'framer-motion'
import {
  addCurrentGuess,
  backspaceGuess,
  clearGuess,
  selectGuess,
} from '../guess/guessSlice'

const RandomPokemon = () => {
  const dispatch = useAppDispatch()

  const randomId = useAppSelector(selectPokemonIds).currentId
  const currentGuess = useAppSelector(selectGuess)

  const { data, error, isLoading } = useGetPokemonByIdQuery(randomId)

  const currentPokemon = useAppSelector(selectPokemon)

  const changePokemon = () => {
    dispatch(setRandomId())
    dispatch(clearPokemon())
  }

  const animControls = useAnimationControls()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        handleAnswer()
      }
    }

    //@ts-ignore
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      //@ts-ignore
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentGuess, currentPokemon.name])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) || // Alphabet keys (A-Z)
        (event.keyCode >= 48 && event.keyCode <= 57) || // Numeric keys (0-9)
        event.keyCode === 32 || // Spacebar
        event.key === 'Backspace' || // Backspace key
        event.key === 'Delete' || // Delete key
        event.key === "'" || // Apostrophe key
        event.key === '-'
      ) {
        event.preventDefault()

        if (event.key === 'Backspace') {
          // Remove the last character from the guess state
          dispatch(backspaceGuess())
        } else if (event.key === 'Delete') {
          // Remove all
          dispatch(clearGuess())
        } else {
          const pressedKey = event.key
          dispatch(addCurrentGuess(pressedKey))
        }
      }
    }

    //@ts-ignore
    document.addEventListener('keydown', handleKeyDown)

    // Don't forget to clean up
    return function cleanup() {
      //@ts-ignore
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    changePokemon()
    dispatch(setProgress(0))
  }, [])

  useEffect(() => {
    let progress = 0
    const pokemonName = currentPokemon.name
    const minLength = Math.min(currentGuess.length, pokemonName.length)

    for (let i = 0; i < minLength; i++) {
      if (currentGuess[i].toLowerCase() === pokemonName[i].toLowerCase()) {
        progress++
      } else {
        break
      }
    }

    dispatch(setProgress(progress / pokemonName.length))
  }, [currentGuess])

  useEffect(() => {
    if (data) {
      dispatch(setPokemon(data))
    }
  }, [data, dispatch])

  const handleAnswer = () => {
    if (currentGuess.toLowerCase() === currentPokemon.name.toLowerCase()) {
      animControls.start({
        scale: [1, 1.25, 1],
        color: ['rgb(24,150,24)', 'rgb(255,255,255)'],
        transition: {
          duration: 0.15,
        },
      })
      dispatch(addScore())
      dispatch(setProgress(0))
      dispatch(addStreak())
      changePokemon()
      setTimeout(() => {
        dispatch(clearGuess())
      }, 150)
    } else {
      animControls.start({
        scale: [1, 1.1, 1, 1.1, 1],
        rotate: [0, 5, 0, -5, 0],
        color: ['rgb(127,24,24)', 'rgb(255,255,255)'],
        transition: {
          duration: 0.3,
        },
      })
      dispatch(resetStreak())
    }
  }

  return (
    <>
      <Box
        height="100%"
        marginBottom={2}
        sx={{
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <div>{isLoading || error ? <p>Loading...</p> : <PokemonFrame />}</div>
      </Box>
      <motion.div
        animate={animControls}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: 1,
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none',
        }}
      >
        <Typography
          variant="h4"
          position="absolute"
          textAlign="center"
          fontWeight={600}
          fontSize={45}
          noWrap
        >
          {currentGuess}
        </Typography>
        <Typography
          variant="h2"
          zIndex={-2}
          position="relative"
          textAlign="center"
          fontWeight={800}
          fontSize={100}
          color="#FFFFFF11"
          noWrap
        >
          {currentGuess}
        </Typography>
      </motion.div>
    </>
  )
}

export default RandomPokemon
