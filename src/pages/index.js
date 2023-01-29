import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'

//! SSR - Server Side Rendering
// export const getServerSideProps = async () => {
//   const res = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')

//   return {
//     props: {
//       pokemon: await res.json(),
//     },
//   }
// }

//! SSG - Static Site Generation
export const getStaticProps = async () => {
  const res = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')

  return {
    props: {
      pokemon: await res.json(),
    },
  }
}

export const Home = ({ pokemon }) => {
  //! CSR - Client-Side Rendering
  // const [pokemon, setPokemon] = useState([])

  // useEffect(() => {
  //   const getPokemon = async () => {
  //     const res = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
  //     setPokemon(await res.json())
  //   }
  //   getPokemon()
  // }, [])

  return (
    <>
      <Head>
        <title>Pokemon list:</title>
      </Head>
      <div className={styles.container}>
        <h2>Pokemon list:</h2>
        <h3>i love my kitty</h3>
        <div className={styles.grid}>
          {pokemon.map((pokemon) => (
            <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={`${pokemon.name}`}
                />
                <h3>{pokemon.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
