pabriktiket = () => {
  visible = 1;
  const getTr = (header) =>
    qsa("h1>b").FindText(header)?.parentElement.Next?.qsa("tbody>tr");

  const URI = window.location.pathname.split("/");
  const trainDetail = getTr("Train Detail");
  const flightDetail = getTr("Flight Detail");
  const transDetail = trainDetail || flightDetail;

  if (URI[2] === undefined) {
    visible = 0;
    return false;
  }
  const headerDetail = (label) =>
    qsa(".tranasction-detail td").FindText(label).Next.Next.Text;
  zKode = headerDetail("Transaction Code");
  zTanggal = headerDetail("Booking Date").replace(" WIB", "");

  let rt = qsa(".itineraryDetail tr.itineraryHead");

  for (var z = 0; z < transDetail.length; z++) {
    var td = transDetail[z].qsa("th");
    // var td1 = trh.Next.qs("td").Text.replace(/(\(|\))/g, "").split(" ");
    //===== Flight
    zFlight += br + td[0].Text;
    //===== Rute
    let ruteA = td[trainDetail ? 3 : 2].Html.split("<br>");
    let ruteB = td[trainDetail ? 4 : 3].Html.split("<br>");

    zRute += br + ruteA[0].trim() + "-" + ruteB[0].trim();
    //===== Maskapai
    zMaskapai += br + td[2].Text.split("(")[0].trim();
    //===== Departure dan Arrive
    zDepArr +=
      br +
      new Date(ruteA[1]).tanggal("num") +
      "->" +
      new Date(ruteB[1]).tanggal("num");
  }

  //====== Penumpang
  // var pen = qsa("h1").FindText("Passenger List").Next.qsa("tbody tr");
  var pen = getTr("Passenger List");
  let kelas = getTr("Passenger Seat");
  let no = 1;
  for (var z = 0; z < pen.length; z++) {
    var td = pen[z].qsa("td");
    zPenumpang += br + td[1].Html.trim().kapital();
    if (trainDetail) {
      zPenumpang += "\n    - NIK: " + td[3].Text.trim();
      zPenumpang += "\n    - (" + kelas[z].qsa("th")[3].Text.trim() + ")";
    }
  }
  //====== Telp
  var zTelp = headerDetail("Phone Number");
  //====== Status
  var sts = headerDetail("Status").toLowerCase().trim();

  // if (sts == "Hold") var sts = "Booking";
  // else if (sts == "Confirm") var sts = "Issued";
  //====== tgl Isseud
  if (sts == "issued")
    zTglSt = new Date(headerDetail("Booking Date").replace(" WIB", "")).tanggal(
      "num",
    );
  //====== Limit
  if (sts == "booked")
    zLimit = new Date(headerDetail("Time Limit").replace(" WIB", "")).tanggal(
      "num",
    );

  //====== NTA
  zNTA = parseFloat(
    qsa("td")
      .FindText("Agent NTA")
      .Next.Text.replace(/[^0-9.]/g, ""),
  ).toFixed(0);
  //====== Harga
  zHarga = parseFloat(
    qsa("th")
      .FindText("Total Price")
      .Next.Text.replace(/[^0-9.]/g, ""),
  ).toFixed(0);

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
  // zHarga = zHarga; //Harga

  // zNTA = zHarga; //Harga
  zHarga = (parseInt(zNTA) / 0.97).toFixed(0);
  zProfit = zHarga - parseInt(zNTA); //Profit
  zLimit = zLimit; //Limit
};
