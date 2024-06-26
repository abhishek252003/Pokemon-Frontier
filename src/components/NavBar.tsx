import { Leaderboard, Menu } from '@mui/icons-material'
import pokeballImage from '../assets/pokeball.png'
import { Button, Container, Drawer, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { selectResponsive } from '../features/responsive/responsiveSlice'
import MobileNavbar from './MobileNavbar'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetGame } from '../utils/gameActions'

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const isHome = location.pathname === '/'

  const isMobile = useAppSelector(selectResponsive).isMobile

  const playAgain = () => {
    navigate('/')
    resetGame(dispatch)
  }

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1} padding={1}>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontSize: isMobile ? 24 : 34,
              paddingBlock: 1,
            }}
          >
            <span style={{ fontWeight: 300 }}>Who's that </span>
            <span style={{ fontWeight: 600 }}>Pokémon</span>
          </Typography>
          <img
            src={pokeballImage}
            style={{ height: isMobile ? '34px' : '70px' }}
          />
        </Stack>
        <motion.div
          whileHover={{
            cursor: 'pointer',
            color: '#af52bf',
            transition: {
              duration: 0.1,
            },
          }}
        >
          {isMobile ? (
            <>
              {!isHome ? (
                <Button variant="outlined" color="success" onClick={playAgain}>
                  Play Again
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ color: 'white', borderColor: '#FFFFFF88', padding: 0 }}
                  onClick={() => setDrawerOpen(true)}
                >
                  <Menu />
                </Button>
              )}
            </>
          ) : !isHome ? (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              onClick={playAgain}
            >
              <Typography variant="h6">Play Again</Typography>
            </Stack>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              onClick={() => navigate('/')}
            >
              <Leaderboard fontSize="inherit" />
              <Typography variant="h6">Pokemon Frontier</Typography>
            </Stack>
          )}
        </motion.div>
      </Stack>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MobileNavbar />
      </Drawer>
    </Container>
  )
}

export default NavBar
