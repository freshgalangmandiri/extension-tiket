velosita = () => {
	if (cek("kereta")) {
		var TBL = $("h3.panel-title:contains('Detail Perjalanan')").parent().next().find("tbody>tr:eq(0)>td");
		visible = 1;
		zMaskapai = "KA";
		zKode = TBL.eq(1).text().trim();
		zFlight = TBL.eq(0).text().trim();
		var TD3 = TBL.eq(3).find(".text-info");
		zRute = TD3.eq(0).text().trim() + "-" + TD3.eq(1).text().trim();
		//var BLN = ["Jan"]
		var Tgl = TBL.eq(2).text().trim().split(",")[1].trim().split(" ");
		var bl = Tgl[1].toLowerCase();
		var bl = (bl == "agt" ? "agu" : bl).bulan();
		var Tgl = Tgl[2] + bl + "" + Tgl[0];
		//====== Departure dan Arrive
		zDepArr = Tgl + TD3.eq(0).parent().next().next().text().split(" ")[1].replace(":", "").trim();
		zDepArr += "->" + Tgl + TD3.eq(1).parent().next().next().text().split(" ")[1].replace(":", "").trim();
		//====== Penumpang
		var Pen = $("header:contains('Data Penumpang')").next().find("table>tbody>tr");
		//alert(Pen.eq(0).find("strong").text());

		zPenumpang = "";
		for (var z = 0; z < Pen.length; z++) {
			zPenumpang += (zPenumpang == "" ? "" : "|>") + Pen.eq(z).find("strong").text().trim();
		}
		CekStatus = $("H1.page-heading").text().indexOf("Issued") > -1;
		zStatus = CekStatus ? "Issued" : "Booking";
		var Lmt = $("li.list-group-item:contains('Time Limit') text").text().split(" ");
		var L = Lmt[1].split("-");

		var bl = L[1].toLowerCase();
		var bl = (bl == "agt" ? "agu" : bl).bulan();

		//====== Limit
		zLimit = CekStatus ? "" : L[2] + bl + L[0] + Lmt[2].replace(":", "").trim();
		//====== NTA
		zNTA = $("table>tbody>tr>td:contains('Harga NTA')").next().text().replace(/(Rp|\.|\s|,|-)/g, "");
		//====== Harga
		zHarga = $("table>tbody>tr>td:contains('Harga Tiket')").next().text().replace(/(Rp|\.|\s|,|-)/g, "");
		//====== Profit
		zProfit = $("table>tbody>tr>td:contains('Komisi')").next().text().replace(/(Rp|\.|\s|,|-)/g, "");
		//alert($("table>tbody>tr>td:contains('Komisi')").next().text().replace(/(Rp|\.|\s|,|-)/g,""));
	} else if (cek("pesawat")) {
		visible = 1;
		var Mas = { GA: "Garuda", QG: "Citilink", SJ: "Sriwijaya", JT: "Lion Air", ID: "Batik Air", IW: "Wings Air", IN: "Nam Air", XT: "Air Asia", QZ: "Air Asia", XN: "Xpress Air", KD: "Kalstar", "8B": "TransNusa" };
		//====== Penerbangan
		var P = $("header:contains('Penerbangan Pergi')").next().find(".table>tbody>tr");
		//alert(P.find("td").eq(1).html());
		for (var z = 0; z < P.length; z++) {
			var TD = P.eq(z).find(">td");

			//======== Flight
			zF = TD.eq(0).find("div").eq(1).text().trim();
			zFlight += br + zF;

			//======== Maskapai
			zMaskapai += br + Mas[zF.substring(0, 2)];

			tdNum = TD.length == 5 ? 0 :
				TD.length == 4 ? 1 : 2;
			//======== Deparuter Arive
			deArTgl = TD.eq(3 - tdNum).text().split(",")[1].split(" ");
			deArTgl = deArTgl[2] + deArTgl[1].bulan() + deArTgl[0];
			deArJam = TD.eq(4 - tdNum).find("span");
			zDepArr += br + deArTgl + deArJam.eq(0).text().split(" ")[1].replace(":", "") + "->";
			zDepArr += deArTgl + deArJam.eq(1).text().split(" ")[1].replace(":", "");

			//======== RUTE
			Rute = TD.eq(4 - tdNum).find("strong");
			zRute += br + Rute.eq(0).text() + "-" + Rute.eq(1).text();/**/

			//======== Kode Booking
			if (tdNum < 2) zKode += br + TD.eq(1).text();/**/
		}
		//====== Penumpang	
		Pen = $("header:contains('Data Penumpang')").next().find("tr");
		zPenumpang = "";
		for (var z = 0; z < Pen.length; z++) {
			zPenumpang += br + Pen.eq(z).find("strong:eq(0)").text().replace("\/ ", "").trim();
		}
		//====== Status
		CekStatus = $("H1.page-heading").text().indexOf("Issued") > -1;
		//====== Limit Status	
		var Lmt = $("li.list-group-item:contains('Time Limit') text").text().split(" ");
		var L = Lmt[1].split("-");
		var bl = L[1].toLowerCase();
		var bl = (bl == "agt" ? "agu" : bl).bulan();

		//====== Maskapai
		zMaskapai = zMaskapai.br();
		//====== Kode Booking
		zKode = zKode.br();
		//====== Status
		zStatus = CekStatus ? "Issued" : "Booking";
		//====== RUTE
		zRute = zRute.br();
		//====== Flight
		zFlight = zFlight.br();
		//====== Penumpang
		zPenumpang = zPenumpang.br();
		//====== Depparture Arrive
		zDepArr = zDepArr.br();
		//====== Limit
		zLimit = CekStatus ? "" : L[2] + bl + L[0] + Lmt[2].replace(":", "").trim();
		//====== NTA
		zNTA = $("td:contains('Harga NTA')").next().text().replace(/(Rp|\.|\s|,|-)/g, "");
		//====== Harga
		zHarga = $("td:contains('Harga Total')").next().text().replace(/(Rp|\.|\s|,|-)/g, "");
		//====== Profit
		zProfit = $("td:contains('Komisi')").next().text().replace(/(Rp|\.|\s|,|-)/g, "");
	}
}