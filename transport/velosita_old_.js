velosita = () => {

	DIVKonf = document.createElement("div");
	DIVKonf.id = "DIVKonf";
	DIVKonf.innerHTML = "<a id='KopasAplikasi'>Aplikasi</a><a id='KopasKonf'>Konfirmasi</a><textarea id='TextKonf'></textarea>";
	document.body.appendChild(DIVKonf);
	StyleKonf = document.createElement("style");
	StyleKonf.innerHTML = "#DIVKonf{position:fixed;top:40%;right:-100px;z-index:99999999;background:#53B9EC;padding:5px 10px;border-radius:5px;box-shadow:-1px 1px 3px #000;transition: all 0.5s ease;}" +
		"#DIVKonf:hover{right:0px;}" +
		"#DIVKonf a{display:block;margin:5px;text-align:center;font-weight:bold;font-size:15px;cursor: pointer;padding: 2px 5px; border-radius: 5px; background: #eee}" +
		"#DIVKonf textarea{position:fixed;top:-100px;width:0px;height:0px;}"
		;
	document.body.appendChild(StyleKonf);
	TextKonf = qs("#TextKonf");
	//========= Pencarian Tiket Pesawat
	if (cek("sistem-agen/login")) {
		DIVKonf.Remove;
		qs("[name='username'").value = "freshtour";
		qs("[name='password'").value = "Qawsed19";
		qs("[name='kode'").focus();
	}
	//========= Pencarian Tiket Pesawat
	else if (cek("tiket-pesawat/pencarian") || cek("tiket-pesawat-pencarian")) {
		qs("#KopasAplikasi").Remove;
		qs("#KopasKonf").onclick = function () {
			var Tgl = qs("#onewayFiveTicket>div.col-sm-4");//Tanggal
			var Thn = qsa("#onewayFiveTicket a.fivers")[2].Attr("data-param");//Tahun
			var OW = qsa("#onewayResultTicketData>div");//One Way


			var d = new Date(parseInt(Thn.substr(0 - 4)), parseInt(Thn.substr(-6, 2)) - 1, parseInt(Thn.substr(-8, 2)) - 1);

			Teks = '*#' + Tgl.innerText.split("\n")[0].trim().replace(/\s/g, "") + (d.getFullYear() - 2000) + "*\n*------------------------*\n";
			[].forEach.call(OW, function (A) {
				Teks += "*" + A.Attr("data-airlines").toTitleCase + "*\n";
				var dt = A.Attr("data-clipboard").split("\n");
				dt.forEach(function (z, i) {
					if (i && i < dt.length - 2) Teks += z.replace(" - ", "```)-").replace(/\s/g, "(```") + "```)\n";
					else if (i == dt.length - 2) Teks += "```" + z.split(' (')[0] + "```\n";
				});
				Teks += "\n";
				//Teks += dt.length+"-"+dt[1].replace(" - ","_)-").replace(/\s/g,"(_")+"_)\n";
			});
			CopyList(Teks);
		}
	}

	//========= Konfirmasi Tiket Pesawat
	else if (cek("-tiket-pesawat-")) {
		qs("#KopasKonf").onclick = function () {
			//===== Rute
			AllTblPenerbangan = Contains("h3", "penerbangan pergi").parentElement.nextElementSibling;
			TheadTbl = AllTblPenerbangan.qsa("table.table>thead>tr>th");
			TblPenerbangan = AllTblPenerbangan.qsa("table.table>tbody>tr");

			let idxMaskapai = TheadTbl.Contains("Maskapai").Index,//Airlines
				idxKode = TheadTbl.Contains("Kode Booking").Index, //K. booking
				idxBagasi = TheadTbl.Contains("Bagasi")?.Index ?? false,
				idxBrgkt = TheadTbl.Contains("Keberangkatan").Index,//Brgkt
				idxDetail = TheadTbl.Contains("Detail").Index;
			Teks = "";
			[].forEach.call(TblPenerbangan, function (A) {
				var TD = A.qsa("td");

				Teks += "*Kode: " + TD[idxKode].innerText.trim() + "*\n";
				Teks += TD[idxMaskapai].qs("img").Attr("alt").toTitleCase + "(" + TD[0].qsa("div")[1].innerText.trim() + ")" + "\n";
				Teks += TD[idxBrgkt].innerText.trim().replace(/\s/g, "").replace(/,/g, ", ") + "\n";
				var TD3Kode = TD[idxDetail].qsa("strong");
				var TD3Jam = TD[idxDetail].qsa("span");
				// console.log(TD[idxKode].qsa("strong"));

				Teks += " - " + TD3Kode[0].innerText.trim() + " (" + TD3Jam[0].innerText.trim().toUpperCase() + ")\n";
				Teks += " - " + TD3Kode[2].innerText.trim() + " (" + TD3Jam[2].innerText.trim().toUpperCase() + ")\n";/**/

				if (idxBagasi) Teks += "Bagasi:" + TD[idxBagasi].qs("strong").innerText + "\n\n";
			});

			//==== Penumpang
			Penumpang = Contains("h3", "Data Penumpang").parentElement.nextElementSibling.qsa("table.table>tbody>tr");
			Teks += "Penumpang:\n";
			[].forEach.call(Penumpang, function (A, B) {
				Teks += (B + 1) + ". " + A.qs(".text-primary").innerText.replace("/ ", "") + "\n";
			});
			Teks += "\nHarga: " + Contains("td>b", "Harga Total").parentElement.nextElementSibling.innerText.trim() + "\n";
			Teks += "Status: " + (cek("-issued") ? "Issued" : "Booking") + "\n";
			if (cek("-booked")) {
				Teks += "Limit: " + Contains("li", "Batas Pembayaran").qs("text").innerText.trim().replace(/(-20|-|,)/g, "").replace(/\s/g, ",").toTitleCase + "\n";
			}


			CopyList(Teks);
		}
		//==Konfirmasi APLIKASI
		qs("#KopasAplikasi").onclick = function () {
			//===== Rute
			AllTblPenerbangan = Contains("h3", "penerbangan pergi").parentElement.nextElementSibling;
			TheadTbl = AllTblPenerbangan.qsa("table.table>thead>tr>th");
			TblPenerbangan = AllTblPenerbangan.qsa("table.table>tbody>tr");

			let idxMaskapai = TheadTbl.Contains("Maskapai").Index,//Airlines
				idxKode = TheadTbl.Contains("Kode Booking").Index, //K. booking
				idxBagasi = TheadTbl.Contains("Bagasi")?.Index ?? false,
				idxBrgkt = TheadTbl.Contains("Keberangkatan").Index,//Brgkt
				idxDetail = TheadTbl.Contains("Detail").Index;
			Teks = {};
			[].forEach.call(TblPenerbangan, function (A) {
				var TD = A.qsa("td");
				let noTd = 1;

				if (TD.length == 7) {
					noTd = 0;
				}
				let Mask = TD[0].qs("img").Attr("alt").toTitleCase;
				if (Mask == "Transnusa") noTd = noTd * -1;
				Mask = "Vel-" + Mask;
				Teks.maskapai = "maskapai" in Teks ? Teks.maskapai + "|>" + Mask : Mask;
				var flight = TD[0].qsa("div")[1].innerText.trim();
				Teks.flight = "flight" in Teks ? Teks.flight + "|>" + flight : flight;
				var rute = TD[3 - noTd].qsa("strong");

				var rute = rute[0].innerText.trim() + "-" + rute[2].innerText.trim();
				Teks.rute = "rute" in Teks ? Teks.rute + "|>" + rute : rute;
				if (noTd == 0) {
					var kode = TD[1].innerText.trim();
					Teks.kode = "kode" in Teks ? Teks.kode + "|>" + kode : kode;
				}
				var DepArr = TD[2 - noTd].innerText.split("\n")[1].trim().split(" ");
				var Bln = zBulan.Pendek.indexOf(DepArr[1].substr(0, 3));
				var Bln = (Bln < 10 ? "0" : "") + Bln;
				var Tg = parseInt(DepArr[0]);
				var Tg = (Tg < 10 ? "0" : "") + Tg;
				var Jam = TD[3 - noTd].qsa("span");
				var dep = DepArr[2] + Bln + Tg + Jam[0].innerText.trim().replace(":", "").split(" ")[0];
				var arr = DepArr[2] + Bln + Tg + Jam[2].innerText.trim().replace(":", "").split(" ")[0];


				Teks.dep = "dep" in Teks ? Teks.dep + "|>" + dep : dep;
				Teks.arr = "arr" in Teks ? Teks.arr + "|>" + arr : arr;

			});

			//==== Penumpang
			[].forEach.call(Contains("h3", "Data Penumpang").parentElement.nextElementSibling.qsa("table.table>tbody>tr"), function (A, B) {
				var penumpang = A.qs(".text-primary").innerText.replace("/ ", "");
				Teks.penumpang = "penumpang" in Teks ? Teks.penumpang + "|>" + penumpang : penumpang;
			});
			//==== Status
			Teks.status = (cek("-issued") ? "Issued" : "Booking");
			//==== Tgl Status
			var TglSts = Contains("li", "Tanggal Pemesanan").qs("text>strong").innerText.split("-");//Created Date
			var d = new Date();
			var j = d.getHours(); var j = (j < 10 ? "0" : "") + j;
			var m = d.getMinutes(); var m = (m < 10 ? "0" : "") + m;
			Teks.tglStat = TglSts[2] + TglSts[1] + TglSts[0] + j + m;
			//==== NTA
			Teks.nta = Contains("td", "Harga NTA").nextElementSibling.innerText.trim().replace(/(Rp|\s|\.|,|-)/g, "");
			//==== Profit
			Teks.profit = Contains("td", "Komisi").nextElementSibling.innerText.trim().replace(/(Rp|\s|\.|,|-)/g, "");
			//==== Harga
			Teks.harga = Contains("td", "Harga Total").nextElementSibling.innerText.trim().replace(/(Rp|\s|\.|,|-)/g, "");

			CopyList(JSON.stringify(Teks));
		}
	}
	//========= Pencarian Tiket Kereta
	else if (cek("tiket-kereta/cari") || cek("tiket-kereta-cari")) {
		qs("#KopasAplikasi").Remove;
		qs("#KopasKonf").onclick = function () {
			Teks = "";
			var OW = qsa("#oneway>table");
			OW.forEach(function (A) {
				var Data = A.nextElementSibling.nextElementSibling.qsa("div.search-row>div");
				if (Data.length > 1) {
					var TD = Data[0].qsa("td");
					if (Teks == "") Teks += "*#KA " + TD[0].innerText + "*\n*------------------------*\n";
					Teks += "*" + A.innerText.trim() + "*\n";
					Teks += TD[1].qs("small").innerText.trim().substr(-4, 3) + "(```" + TD[1].qs("h4").innerText.trim() + "```)-";
					Teks += TD[2].qs("small").innerText.trim().substr(-4, 3) + "(```" + TD[2].qs("h4").innerText.trim() + "```)\n";
					for (var z = 0; z < (Data.length / 2); z++) {
						var i = (z * 2) + 1;
						var TD = Data[i].qsa("td");
						Teks += TD[0].qs("td").innerText.trim().substr(0, 3) + "(```" + TD[0].qs("small>b").innerText.trim() + "```)"
							+ ": " + Data[i].qs("h3").innerText.trim() + "\n";
					}

					Teks += "\n";
				}
			});
			CopyList(Teks);
		}
	}
	//========= Konfirmasi Tiket Kereta
	else if (cek("-tiket-kereta-")) {
		// qs("#KopasAplikasi").Remove;
		qs("#KopasKonf").onclick = function () {
			//===== Rute
			Detail = Contains("h3", "Detail Perjalanan").parentElement.nextElementSibling.qsa("table.table>tbody>tr");
			Teks = "";

			Detail.forEach(function (A) {
				var TD = A.qsa("td");
				Teks += "*Kode: " + TD[1].innerText.trim() + "*\n";
				Teks += "KA " + TD[0].innerText.trim() + "\n";
				Teks += TD[2].innerText.trim().replace("\n", " ") + "\n";
				Teks += " - " + TD[3].qsa("strong")[0].innerText.trim() + "(```" + TD[3].qsa("span")[0].innerText.trim() + "```)\n";
				Teks += " - " + TD[3].qsa("strong")[1].innerText.trim() + "(```" + TD[3].qsa("span")[1].innerText.trim() + "```)\n\n";
			});

			//====== Penumpang
			Pen = Contains("header", "Data Penumpang").parentElement.qsa("strong");
			Teks += "Penumpang:\n";
			Pen.forEach(function (A, B) {
				var Spn = A.parentElement.qsa("span");
				Teks += (B + 1) + ". " + A.innerText + "\n";
				Teks += " - ```NIK: " + Spn[0].innerText + "```\n";
				Teks += " - ```" + Spn[1].innerText + "```\n";
			});

			Teks += "\nHarga: ```" + Contains("td", "Harga Tiket").nextElementSibling.innerText.trim() + "```\n";
			Teks += "Status: " + (cek("-issued") ? "Issued" : "Booking") + "\n";
			if (cek("-booked")) {
				Teks += "Limit: " + Contains("li", "Batas Pembayaran").qs("text").innerText.trim().replace(/(-20|-|,)/g, "").replace(/\s/g, ",").toTitleCase + "\n";
			}
			CopyList(Teks);
		}
		qs("#KopasAplikasi").onclick = function () {
			Detail = Contains("h3", "Detail Perjalanan").parentElement.nextElementSibling.qsa("table.table>tbody>tr");
			Teks = {};

			Detail.forEach(function (A) {

				// });
				// [].forEach.call(TblPenerbangan, function (A) {
				let TD = A.qsa("td");
				let noTd = 1;
				if (TD.length == 7) {
					noTd = 0;
				}
				let Mask = "Vel-Kereta Api";
				Teks.maskapai = "maskapai" in Teks ? Teks.maskapai + "|>" + Mask : Mask;
				let flight = TD[0].innerText.trim();
				Teks.flight = "flight" in Teks ? Teks.flight + "|>" + flight : flight;
				// let rute = TD[3 - noTd].qsa("strong");
				let rute = TD[3].qsa("strong");
				console.log(rute);

				rute = rute[0].innerText.trim() + "-" + rute[1].innerText.trim();
				Teks.rute = "rute" in Teks ? Teks.rute + "|>" + rute : rute;
				if (noTd == 0) {
					let kode = TD[1].innerText.trim();
					Teks.kode = "kode" in Teks ? Teks.kode + "|>" + kode : kode;
				}
				let DepArr = TD[2].innerText.split("\n")[1].trim().split(" ");
				let Bln = zBulan.Pendek.indexOf(DepArr[1].substr(0, 3));
				Bln = (Bln < 10 ? "0" : "") + Bln;
				let Tg = parseInt(DepArr[0]);
				Tg = (Tg < 10 ? "0" : "") + Tg;
				let Jam = TD[3].qsa("span");
				let dep = DepArr[2] + Bln + Tg + Jam[0].innerText.trim().replace(":", "").split(" ")[0];
				let arr = DepArr[2] + Bln + Tg + Jam[1].innerText.trim().replace(":", "").split(" ")[0];
				Teks.dep = "dep" in Teks ? Teks.dep + "|>" + dep : dep;
				Teks.arr = "arr" in Teks ? Teks.arr + "|>" + arr : arr;

			});

			//==== Penumpang
			[].forEach.call(Contains("h3", "Data Penumpang").parentElement.nextElementSibling.qsa("table.table>tbody>tr"), function (A, B) {
				var penumpang = A.qs(".text-primary").innerText.replace("/ ", "");
				Teks.penumpang = "penumpang" in Teks ? Teks.penumpang + "|>" + penumpang : penumpang;
			});
			//==== Status
			Teks.status = (cek("-issued") ? "Issued" : "Booking");
			//==== Tgl Status
			var TglSts = Contains("li", "Tanggal Pemesanan").qs("text>strong").innerText.split("-");//Created Date
			var d = new Date();
			var j = d.getHours(); var j = (j < 10 ? "0" : "") + j;
			var m = d.getMinutes(); var m = (m < 10 ? "0" : "") + m;
			Teks.tglStat = TglSts[2] + TglSts[1] + TglSts[0] + j + m;
			//==== NTA
			Teks.nta = Contains("td", "Harga NTA").nextElementSibling.innerText.trim().replace(/(Rp|\s|\.|,|-)/g, "");
			//==== Profit
			Teks.profit = Contains("td", "Komisi").nextElementSibling.innerText.trim().replace(/(Rp|\s|\.|,|-)/g, "");
			//==== Harga
			Teks.harga = Contains("td", "Harga Tiket").nextElementSibling.innerText.trim().replace(/(Rp|\s|\.|,|-)/g, "");

			CopyList(JSON.stringify(Teks));
		}
	}



}