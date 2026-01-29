import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>タイピングアリーナ</title>
        <meta name="description" content="リアルタイム対戦できるタイピングゲーム" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={styles.main}>
        <h1 style={styles.title}>タイピングアリーナ</h1>
        <p style={styles.description}>プレイヤー画面（準備中）</p>
      </main>
    </>
  );
};

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default Home;