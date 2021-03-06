import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';
//import ShimmerEffect from '../src/screens/ShimmerEffect';


export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    
    <QuizBackground backgroundImage={db.bg}>
      
      <Head>
        <title>AluraQuiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{delay: 0, durantion: 0.5}}
          variants={{
            show: {opacity: 1},
            hidden: {opacity: 0},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>The Supernatural Questions</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?name=${name}`)
              console.log("fazendo uma submissao por meio do react");
            }}>
              <Input
                name="nomeDoUsuario"
                value={name}
                onChange={(e) => { setName(e.target.value); }}
                placeholder="Diga seu nome:"
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget 
          as={motion.section}
          transition={{delay: 0.5, durantion: 0.5}}
          
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quiz da galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic 
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li> 
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer as={motion.footer}
          transition={{delay: 0.5, durantion: 0.5}}
          
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'},
          }}
          initial="hidden"
          animate="show"/>

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/juniimsi" />
    </QuizBackground>
  )
}
