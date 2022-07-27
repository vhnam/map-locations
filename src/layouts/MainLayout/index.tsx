import { Header, Text, AppShell, Container, Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import useStyles, { HEADER_HEIGHT } from './styles';

const MainLayout = () => {
  const { classes } = useStyles();

  return (
    <AppShell
      header={
        <Header className={classes.header} height={HEADER_HEIGHT}>
          <Container fluid className={classes.inner}>
            <Text color="white" size="xl" transform="uppercase" weight={700}>
              Map Locations
            </Text>
          </Container>
        </Header>
      }
    >
      <Box className={classes.mainContent}>
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default MainLayout;
