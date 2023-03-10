import { useRouter } from 'next/router'
import React from 'react'
import styles from '@/styles/Details.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

//! SSR - Server Side Rendering
// export const getServerSideProps = async ({ params }) => {
//   const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)

//   return {
//     props: {
//       pokemon: await res.json(),
//     },
//   }
// }
//! SSG - Static Site Generation
export const getStaticPaths = async () => {
  const { data } = await axios.get('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')

  const pokemon = await data

  return {
    paths: pokemon.map((pokemon) => ({
      params: {
        id: pokemon.id.toString(),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { data } = await axios.get(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)

  return {
    props: {
      pokemon: await data,
    },
    revalidate: 30,
  }
}

export const Details = ({ pokemon }) => {
  //! CSR - Client-Side Rendering
  // const {
  //   query: { id },
  // } = useRouter()

  // const [pokemon, setPokemon] = useState(null)

  // useEffect(() => {
  //   const getPokemon = async () => {
  //     const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
  //     setPokemon(await res.json())
  //   }

  //   if (id) {
  //     getPokemon()
  //   }
  // }, [id])

  // if (!pokemon) {
  //   return null
  // }
  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <Link href="/">
        <h3>Go back</h3>
      </Link>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Details
