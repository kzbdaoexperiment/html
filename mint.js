
async function mint()
{
	// Ustaw dostawcę sieci i podpisującego
	const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	await provider.send("eth_requestAccounts", []);
	const signer = provider.getSigner();

	// Ustaw adres i ABI kontraktu ERC20
	const address = "0x9f7FAF70e9184e0bAe20b6A6e6D14444B6Fc9D85";
	const abi = [
	  "function mint() public"
	];

	// Utwórz instancję kontraktu za pomocą adresu i ABI
	const contract = new ethers.Contract(address, abi, provider);

	// Podłącz podpisującego do kontraktu
	const contractWithSigner = contract.connect(signer);

	// Wywołaj funkcję mint
	contractWithSigner.mint()
	.then((tx) => {
		console.log("Transakcja wysłana:", tx.hash);
		document.getElementById("message").innerText = ("PROSZĘ CZEKAĆ. Transakcja wysłana. Txn Hash: " + tx.hash);
		return tx.wait(); // Poczekaj na potwierdzenie bloku
	})
	.then((receipt) => {
		console.log("Transakcja wykonana. Txn Hash:", receipt.transactionHash);
		document.getElementById("message").innerText = ("Transakcja wykonana poprawnie. Txn Hash: " + receipt.transactionHash);
	})
	.catch((error) => {
		console.error("Błąd:", error);
		if (error.message.toLowerCase().includes("You must own an NFT to mint tokens".toLowerCase())) {
			document.getElementById("message").innerText = ("Błąd: Nie posiadasz KZB NFT na wskazanym portfelu");
		}
		else
		{
			document.getElementById("message").innerText = ("Błąd: " + error.message);
		}
	});
}
