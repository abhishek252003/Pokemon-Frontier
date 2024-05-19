import { Box, Tooltip, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        textAlign: 'center',
        left: 0,
        bottom: 0,
        paddingTop: 4,
        paddingBottom: 2,
      }}
    >
      {/* currentDifficulty === 'easy' ? '#6fbf73' : currentDifficulty === 'medium'
      ? '#ffcd38' : currentDifficulty === 'hard' ? '#aa2e25' : '' */}
      <Typography variant="subtitle2">
        {' '}
        <a
          href="#"
          style={{ textDecoration: 'none', color: '#ffcd38' }}
        >
        
        </a>
      </Typography>
      <Typography variant="subtitle2" fontWeight={400}>
        {' '}
        {/* <Tooltip title="">
          <a
            href="#"
            style={{ color: '#6fbf73', fontWeight: 500 }}
          >
            Support my work
          </a>
        </Tooltip>{' '} */}
        {' '}
        <a
          href="#"
          style={{ color: '#aa2e25', fontWeight: 500 }}
        >
          
        </a>
      </Typography>
      <Typography variant="subtitle2" fontWeight={400} fontSize={12}>
     {' '}
        <a
          href="#"
          style={{ color: 'white', fontWeight: 500 }}
        >
          .
        </a>
      </Typography>
    </Box>
  )
}

export default Footer
