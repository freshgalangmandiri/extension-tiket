citilink = () => {
  if (cek("passenger.aspx")) {
    qs(
      "#CONTROLGROUPPASSENGER_ContactInputPassengerView_TextBoxHomePhone",
    ).blur(function () {
      ck("zTelp=" + $(this).val()); //Telephone
    });
  } else {
    visible = 1;
    var d = new Date();

    var tgl = qs(
      "#itineraryBody table tr:nth-child(1) td:nth-child(2) span",
    ).innerText.split(" ");
    zTanggal = (
      tgl[2] +
      " " +
      tgl[1] +
      " " +
      tgl[3] +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes()
    ).tanggal("num");

    zKode = SpanRecordLocator.Text;

    // var A = $("p:contains('keberangkatan dari')").eq(0).parent().find("h6");
    var A = qs(".flightDisplay_IT").qsa("h6");

    tes = "";
    for (var z = 1; z < A.length; z++) {
      // if (z % 2 === 0) continue;
      var h6 = A[z];
      var h6s = h6.Text.replace(/(\s)/g, "-").split("-");
      //====== Flight
      zFlight += br + "QG " + h6s[h6s.length - 1];

      //====== Maskapai
      zMaskapai += br + "Citilink";
      //====== Rute
      d = h6.Next.Text.replace(/(\r|\n|\s)/g, "").split("(+");
      d = d[0].split("(");
      a = h6.Next.Next.Text.replace(/(\r|\n|\s)/g, "").split("(");
      zRute +=
        br +
        d[d.length - 1].substring(0, 3) +
        "-" +
        a[a.length - 1].substring(0, 3);
      // console.log(zRute);
      //====== Departure dan Arrive
      var tg = h6s[0] + " " + h6s[1].substring(0, 3) + " " + h6s[2];

      dp = d[d.length - 1].split("Jam")[1].trim();
      if (dp.length == 4) dp = "0" + dp;

      zDepArr += br + (tg + " " + dp).tanggal("num");
      dp = a[a.length - 1].split("Jam")[1].trim();
      if (dp.length == 4) dp = "0" + dp;
      zDepArr += "->" + (tg + " " + dp).tanggal("num");
    }
    //========= Penumpang
    var pen = qsa("#seatAssignmentContent tbody tr");
    for (var z = 0; z < pen.length; z++) {
      var td = pen[z].qs("td").Text.kapital().trim();
      if (td !== "") {
        zPenumpang += br + td;
      }
    }
    //========= Status
    // const tdxx = [...qsa("td")]
    // 	.find(el => el.textContent.includes("Status:"));

    zStatus = qsa("td").FindText("Status:").Next.Text.trim();
    if (zStatus == "Konfirm") zStatus = "Issued";
    //========= Limit
    else {
      var lmt = qs("#itineraryBody p").Text.split("\n");
      // var tg = lmt[1].trim().split(" ");
      // zLimit = (tg[2] + " " + tg[1] + " " + tg[3] + " " + lmt[3].trim()).tanggal("num");
      var tg = lmt[0].trim().replace(/\,/g, "").split(" ");

      zLimit = (
        tg[5].trim() +
        " " +
        tg[4].trim() +
        " " +
        tg[6].trim() +
        " " +
        tg[8].trim()
      ).tanggal("num");
    }
    //alert(zStatus)

    //======= Hasil Variable
    zFlight = zFlight.br(); //Rute
    zMaskapai = "Citilink"; //Maskapai
    zRute = zRute.br(); //Rute
    zDepArr = zDepArr.br(); //Departure dan Arrive
    zPenumpang = zPenumpang.br(); //Penumpang
    zTelp = ck("zTelp"); //Telephone
    zStatus = zStatus; //Status Issued/Booking
    zTglSt = zTanggal; //Tanggal Status
    zNTA = qsa("td")
      .FindText("TOTAL BIAYA : ")
      .Next.Next.Text.replace(/(Rp.|,)/g, "")
      .replace(/\./g, ""); //NTA
    // zHarga = zNTA; //Harga
    zHarga = (parseInt(zNTA) / 0.97).toFixed(0);
    zProfit = zHarga - parseInt(zNTA); //Profit
    zLimit = zLimit; //Limit
  }
};
