import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import logo from '../images/logo.png';

export default function Home({data}) {

  const contos = [];

  for (let i = 0; i < data.length; i++) {
    contos.push(<div>
      <img class="capa" src={data[i].content.rendered.split(" ")[7].split('"')[1]}></img>
      <p class="titulo">{data[i].slug}</p>
    </div>);
  }

  return (
      <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img id="logo" src={logo.src}></img>

      <p id="slogan">quem conta um conto, acrescenta um ponto</p>

      <section class="scrollport">
        {contos}
      </section>


    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('http://teste-projeto-dw.local//wp-json/wp/v2/conto');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data
    },
  }
}