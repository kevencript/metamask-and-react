import { useEffect, useState } from "react"
import './App.css';


const App = () =>  {
  const [isConnected, setConnectedStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [walletAddress, setWallet] = useState('')

  const connectWalletPressed = async () => {
      if(isConnected) return alert(
        "Conta já conectada! " +
        String(walletAddress).substring(0, 5) +
        "..." +
        String(walletAddress).substring(38)
      )
      
      const walletResponse = await connectWallet()
      setConnectedStatus(walletResponse.connectedStatus)
      setStatus(walletResponse.status)
      setWallet(walletResponse.address)
      
  }

  const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const address = await window.ethereum.enable() 
            const obj = {
                connectedStatus:true,
                status:"Conectado",
                address: address
            }
            return obj;
        } catch (error) {
            return {
                connectedStatus: false,
                status: "Erro durante a conexão com a conta"
            }
        }
    } else {
        return {
            connectedStatus: false,
            status: "Instale a Metamask no seu browser: https://metamask.io/download.html"
        }
    }
  };


  return (
    <div className="App">
      {/* Sessão da Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Metadevs.com.br</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li> */}
            </ul>
            <span className="navbar-text">
              <button className="btn btn-light" style={{cursor: 'pointer'}} onClick={connectWalletPressed}>
                Conectar com a MetaMask 🦊
              </button>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
