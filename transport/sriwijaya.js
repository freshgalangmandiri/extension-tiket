sriwijaya = () => {
  visible = 1;
  zKode = qsa(".bookingCode")[1].Text;
  zTanggal = qs(".status").Text.tanggal("num");
  let rt = qsa(".itineraryDetail tr.itineraryHead");

  for (var z = 0; z < rt.length; z++) {
    var trh = rt[z];
    var td1 = trh.Next.qs("td")
      .Text.replace(/(\(|\))/g, "")
      .split(" ");
    //===== Flight
    zFlight += br + td1[0] + " " + td1[1];
    //===== Rute
    zRute += br + td1[2];
    //===== Maskapai
    var mas = "Sriwijaya";
    if (td1[0] == "IN") var mas = "Nam Air";
    zMaskapai += br + mas;
    //===== Departure dan Arrive
    var tg = trh.Text.trim().split(" ")[0].replace(/-/g, " ");
    var jamA = trh.Next.qsa("td")[1].Text.split(" ")[2];
    var jamB = trh.Next.qsa("td")[2].Text.split(" ")[2];
    zDepArr +=
      br +
      (tg + " " + jamA).tanggal("num") +
      "->" +
      (tg + " " + jamB).tanggal("num");
  }

  //====== Penumpang
  var pen = qs(".passengerDetail").qsa("tr");
  for (var z = 2; z < pen.length; z++) {
    var td = pen[z].qsa("td");
    var nama = td[2].Html.trim().split("(")[0];
    zPenumpang += br + (td[1].Text.trim() + " " + nama.split("<")[0]).kapital();
  }

  //====== Telp
  var zTelp = qsa("table.passengerDetail")[1].qsa("tr")[2].qsa("td")[1].Text;
  //====== Status
  var sts = qsa(".bookingCode")[2].Text;
  if (sts == "Hold") var sts = "Booking";
  else if (sts == "Confirm") var sts = "Issued";
  //====== tgl Isseud
  if (sts == "Issued") zTglSt = qs(".timeLimit").Text.tanggal("num");
  //====== Limit
  if (sts == "Booking") zLimit = qs(".timeLimit").Text.tanggal("num");
  //====== NTA
  // console.log(qsa(".pnrPaymentDetail th.nta").Contains("NTA").Next.Text);
  // var nt = qsa(".pnrPaymentDetail th.nta")
  //   .Contains("NTA")
  //   .Next.Text.replace(/(IDR|,)/g, "")
  //   .trim()
  //   .split(" ");
  // let nta_ = [...qsa(".pnrPaymentDetail td.nta")]
  //   .at(-1)
  //   .Text.replace(/(IDR|,)/g, "")
  //   .trim()
  //   .split(" ")
  //   .at(-1);
  // console.log(nta_);

  // zNTA = nt[nt.length - 1];
  zNTA = [...qsa(".pnrPaymentDetail td.nta")]
    .at(-1)
    .Text.replace(/(IDR|,)/g, "")
    .trim()
    .split(" ")
    .at(-1);
  //====== Harga old
  // var nt = qsa(".pnrPaymentDetail th.fareTotal")
  //   .Contains("TOTAL")
  //   .Next.Text.replace(/(IDR|,)/g, "")
  //   .trim()
  //   .split(" ");
  // zHarga = nt[nt.length - 1];

  //======= Hasil Variable
  zFlight = zFlight.br(); //Rute
  zMaskapai = zMaskapai.br(); //Maskapai
  zRute = zRute.br(); //Rute
  zDepArr = zDepArr.br(); //Departure dan Arrive
  zPenumpang = zPenumpang.br(); //Penumpang
  zTelp = zTelp; //Telephone
  zStatus = sts; //Status Issued/Booking
  zTglSt = zTglSt; //Tanggal Status
  zNTA = zNTA; //NTA
  // zNTA = zHarga; //Harga
  zHarga = (parseInt(zNTA) / 0.97).toFixed(0);
  zProfit = zHarga - parseInt(zNTA); //Profit
  zLimit = zLimit; //Limit
};
