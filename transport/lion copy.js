lion = () => {

	var imgSrc = "none";
	if ($("#imgStepHeader").length > 0) { var imgSrc = $("#imgStepHeader").attr("src"); }


	if (imgSrc.indexOf("step1") > -1) {
		var uc = "UcFlightSelection_";
		selRet = uc + "ddlRetMonth";
		selDep = uc + "ddlDepMonth";
		getTh();
		$('#' + selRet + ',#' + selDep).change(function () {
			getTh();
		});
		function getTh() {
			ck("zTahunDep=" + $("#" + selDep).val().split(" ")[1]);
			ck("zTahunRet=" + $("#" + selRet).val().split(" ")[1]);
		}
	}
	else if (imgSrc.indexOf("step3") > -1) {
		$("#txtCountryCode1,#txtAreaCode1,#txtPhoneNumber1").blur(function () {
			ck("zTelp=" + $("#txtCountryCode1").val() + $("#txtAreaCode1").val() + $("#txtPhoneNumber1").val())
		});
	}
	else if (imgSrc.indexOf("step4") > -1 || cek("confirmation") || cek("ticketbooking") || cek("bookingdetails") || cek("air")) {

		var tbNo = 1; var ruteNo = 0;
		if (cek("confirmation") || cek("ticketbooking")) {
			$(".RelocHighlight").attr("id", "lblRefNumber");
			var tbNo = 0;
		} else if (cek("bookingdetails")) {
			$("#ctl00_ContentPlaceHolder1_lblBookingReloc").attr("id", "lblRefNumber");
			$("#ctl00_ContentPlaceHolder1_gvBookingsItinerary").attr("id", "FlightTable");
			var trPener = $("#FlightTable tr");
			for (var z = 1; z < trPener.length; z++) {
				var td = trPener.eq(z).find("td");
				td.eq(0).append("<div class='FlightNumberInTable' style='display:none'>" + td.eq(0).html() + " " + td.eq(1).html() + "</div>")
			}
			var tbNo = 0; var ruteNo = 1;
		}
		//=====tanggal==>
		if ($("#lblIssuedDate") > 0) zTanggal = $("#lblIssuedDate").text().tanggal("num");
		zKode = $("#lblRefNumber").text().trim();
		var tb = $("#FlightTable tr");
		let TR = qsa("#FlightTable tr:not(.etiHeading)"),
			Mask = { JT: "Lion Air", IW: "Wings Air", ID: "Batik Air", IU: "Super Air Jet" };
		TR.forEach((tr, i) => {
			let td = tr.qsa("td"),
				isiFl = tr.qs(".FlightNumberInTable")?.innerText.trim() || "";
			zFlight += br + isiFl;
			zMaskapai += br + Mask[isiFl.substring(0, 2)];

			let td2 = td[1 + ruteNo]?.innerHTML.split("<br>") || [];
			let td3 = td[2 + ruteNo]?.innerHTML.split("<br>") || [];
			zRute += br + td2[0]?.trim().slice(-4).substring(0, 3) + "-" + td3[0]?.trim().slice(-4).substring(0, 3);
			//===== Departure dan Arrive==
			let dep = td2[1]?.split(" ") || [];
			let bl = dep[4]?.split("<")[0] || "";
			dep = dep[3]?.split(">")[1] + " " + bl + " " + bl.tahun() + " " + dep[0];
			let arr = td3[1]?.split(" ") || [];
			bl = arr[4]?.split("<")[0] || "";
			arr = arr[3]?.split(">")[1] + " " + bl + " " + bl.tahun() + " " + arr[0];
			zDepArr += br + dep.tanggal("num") + "->" + arr.tanggal("num");

			//===== Status ==
			if (zStatus == "") {
				let sts = "Issued";
				if (td[7].innerText.trim() == "Not Ticketed") sts = "Booking";
				zStatus = sts;
			}

			// console.log(td.qs(".FlightNumberInTable").innerText.trim());
		});

		let tblPenumpang = qsa("#PassengerTable tr:not(.etiHeading)");
		tblPenumpang.forEach((tr, i) => {
			zPenumpang += br + tr.qsa("td")[1].innerText.kapital();
		});


		//===== NTA ==	
		zNTA = 0;
		let nt = Contains("script", "NTA = IDR");
		if (nt) zNTA = nt.innerText.split(" ")[3].replace(/(;|,|\)|\')/g, "");
		nt = qsa("#trNTA>td");
		if (nt.length) zNTA = nt[3].innerText.replace(/(;|,|\)|\')/g, "");
		//	javascript:__doPostBack('lbShowNTA','')

		//===== Limit ==		
		if (zStatus == "Booking") zLimit = qs("#lblPayByDate").innerText.tanggal("num");

		zFlight = zFlight.br();//Rute
		zMaskapai = zMaskapai.br();//Maskapai
		zRute = zRute.br();//Rute
		zDepArr = zDepArr.br();//Departure dan Arrive
		zPenumpang = zPenumpang.br();//Penumpang
		zTelp = ck("zTelp");//Telephone
		zStatus = zStatus;//Status Issued/Booking
		zTglSt = qs("#lblIssuedDate").innerText.tanggal("num");//Tanggal Issued/booking			
		zNTA = zNTA;//NTA
		zHarga = qs("#lblTotalFares").innerText.replace(/(,)/g, "");//Harga
		zProfit = parseInt(zHarga) - parseInt(zNTA);//Profit
		zLimit = zLimit;//Limit
		visible = 1;
	}
}