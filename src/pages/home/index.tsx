import 'react';
import Chat from '../../components/chat';

function Home() {
  return (
    <>
      <div id='hal-eye'>
        <img
          src="/hal-9000.png"
          alt="hal-9000"
          width={"100rem"}
        />
      </div>

      <br />

      <Chat />
    </>
  )
}

export default Home;