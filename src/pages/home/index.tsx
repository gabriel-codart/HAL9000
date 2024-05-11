import 'react';
import Chat from '../../components/chat';

function Home() {
  return (
    <>
      <div id='hal-eye'>
        <img
          src="/hal-9000.png"
          alt="hal-9000"
          width={"150rem"}
        />
      </div>

      <br />
      
      <h1>Olá, eu sou o HAL-9000</h1>
      <p>Em que posso ajudá-lo?</p>

      <br />

      <Chat />
    </>
  )
}

export default Home;