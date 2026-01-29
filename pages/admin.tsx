import type { NextPage } from 'next';
import Head from 'next/head';

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>管理画面 - タイピングアリーナ</title>
        <meta name="description" content="タイピング問題の管理画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={styles.main}>
        <h1 style={styles.title}>管理画面</h1>
        <p style={styles.description}>問題管理機能（準備中）</p>
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
    backgroundColor: '#f0f0f0',
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

export default Admin;