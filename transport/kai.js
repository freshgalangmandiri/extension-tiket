kai = () => {
	let tgl = qs(".date").innerText.split(" ");
	tgl = tgl[3] + tgl[2].bulan() + tgl[1].sepuluh();
	let tBlok = qsa(".table-block>.row");
	let jam = tBlok[0].qsa(".right>p");
	let rute = tBlok[0].qsa(".left>p>strong");
	let limit = qs("#countdown").parentElement.qs(".error").innerText.split(" ");


	zPenumpang = "";
	qsa(".destionation-wrapper>.row").forEach((a, b) => {
		if (zPenumpang != "") { zPenumpang += "|>"; }
		zPenumpang += a.qs(".left li").innerText + ` (${a.qs(".right li").innerText})`;
	})

	visible = 1;
	zMaskapai = "Kereta Api\n" + $(".train").text().split(" (")[0];
	zRute = rute[0].innerText + "-" + rute[1].innerText;
	zDepArr = tgl + jam[0].innerText.split(" ")[0].replace(/:/g, "") + "->" + tgl + jam[1].innerText.split(" ")[0].replace(/:/g, "");
	// zPenumpang = "Mr Agbriantoko Dheka  Putra|>Mr Noorida Idhar Adzananda  Azizi|>Mr Alif Fajar  Maulana|>Mr Angga  Azfananda|>Mrs Salsa Apriliana  Arsanti";
	zTelp = "0";
	zStatus = "Booking";
	zTglSt = "";
	zProfit = "0";
	zNTA = zHarga = tBlok[1].qs(".right strong").innerText.replace(/\D/g, "");
	zLimit = limit[2] + limit[1].bulan() + limit[0].sepuluh() + limit[4].replace(/\:/g, "").substring(0, 4);//Limit
}
// alert("asd")