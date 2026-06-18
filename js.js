var textar = `<style>
#zKopasDiv{
	position:fixed;
	width:150px;
	right:-100px;
	top:50%;
	z-index:999999999999999;
	transition: all 0.5s ease;
}
#zKopasDiv textarea{
	display:inline-block;
	width:200px;
	height:300px;
	border:0px solid#fff;
	position: absolute;
	right: -1000px;
}
#zKopasDiv:hover{right:0px;}
#zKopasDiv button{
	display:block;
	padding: 10px 5px;
	width: 100%;
	font-size: 18px;
    background: #aaa6dc;
	color:#fff !important;
	cursor:pointer;
	height: fit-content !important;
	border-width: 0px !important;
}
#zKopasDiv button:first-child{
	border-bottom: 1px solid #fff !important;
	border-bottom-width: 1px !important;
}
#zKopasDiv button:hover{
    background: #938ddf;
}
</style>
<div id='zKopasDiv' style=''><button tid='zKopasTextApp'>Aplikasi</button> <button tid='zKopasText'>Konfirmasi</button> <textarea id='zKopasTextApp'></textarea><textarea id='zKopasText'></textarea></div>`;
//<button tid='zKopasExcel'>Excel</button><textarea id='zKopasExcel'></textarea>
visible = 0;
zTanggal =
  zMaskapai =
  zFlight =
  zRute =
  zKode =
  zDepArr =
  zPenumpang =
  zTelp =
  zStatus =
  zTglSt =
  zNTA =
  zProfit =
  zHarga =
  zLimit =
    "";
zDepo = "Yes";
br = "|>";

String.prototype.br = function () {
  var tx = this.trim();
  if (tx.substring(0, 2) == br) {
    tx = tx.substring(2);
  }
  return tx;
};

if (cek("velosita")) velosita();
else if (cek("pabriktiket")) pabriktiket();
else if (cek("lion")) lion();
else if (cek("citilink")) citilink();
else if (cek("sriwijaya")) sriwijaya();
else if (cek("kai")) kai();

/*######################################################################################################
## Hasil ############################################################################################
#######################################################################################################*/
if (visible) {
  if ($("#zKopasDiv").length == 0) $("body").prepend(textar);
  $("#zKopasText").val(penerbangan);
  //console.log( "zKode: " + zKode + "\nzFlight: " + zFlight + "\nzMaskapai: " + zMaskapai + "\nzRute: " + zRute + "\nzDepArr: " + zDepArr + "\nzPenumpang: " + zPenumpang + "\nzTelp: " + zTelp + "\nzStatus: " + zStatus + "\nzTglSt: " + zTglSt + "\nzNTA: " + zNTA + "\nzProfit: " + zProfit + "\nzHarga: " + zHarga);

  var fli = zFlight.split("|>");
  var mas = zMaskapai.split("|>");
  var deAr = zDepArr.split("|>");
  var rut = zRute.split("|>");
  var pen = zPenumpang.split("|>");
  var maskapaiAplikasi = ""; //Untuk Aplikasi
  //========= Penerbangan >
  var penerbangan = "";
  for (var z = 0; z < fli.length; z++) {
    var tgD = deAr[z].split("->")[0];
    var tgA = deAr[z].split("->")[1];
    var tgAr = "";
    var mask = mas[z];
    if (mas.length == 1) {
      var mask = zMaskapai;
      maskapaiAplikasi += (maskapaiAplikasi == "" ? "" : "|>") + zMaskapai;
    } else {
      var maskapaiAplikasi = zMaskapai;
    }
    if (tgD.substring(0, 8) !== tgA.substring(0, 8))
      var tgAr = tgA.tanggal("hari") + "," + tgA.tanggal() + "\n";
    // penerbangan += mask + (fli[z] == "" ? "" : "(" + fli[z].replace(/\s/g, "-") + ")") + "\n" +
    // 	tgD.tanggal("hari") + "," + tgD.tanggal().replace(/\s/g, "") + "\n" +
    // 	" - " + rut[z].split("-")[0] + " (" + tgD.tanggal("jam") + ")" + "\n" +
    // 	tgAr +
    // 	" - " + rut[z].split("-")[1] + " (" + tgA.tanggal("jam") + ")" + "\n\n";
    penerbangan +=
      mask +
      (fli[z] == "" ? "" : "(" + fli[z].replace(/\s/g, "-") + ")") +
      "\n" +
      tgD.tanggal("hari") +
      ", " +
      tgD.tanggal().replace(/\s/g, "") +
      "\n" +
      " - " +
      rut[z].split("-")[0] +
      " (" +
      tgD.tanggal("jam") +
      ")" +
      "\n" +
      tgAr +
      " - " +
      rut[z].split("-")[1] +
      " (" +
      tgA.tanggal("jam") +
      ")" +
      "\n\n";
  }
  //========= Penumpang >
  var penumpang = "";
  for (var z = 0; z < pen.length; z++) {
    penumpang += " " + (z + 1) + ". " + pen[z] + "\n";
  }

  //========= Limit >
  if (zLimit !== "")
    zLimit = "\nLimit: " + zLimit.tanggal("tglJam").replace(/\s/g, "");
  $("#zKopasText")
    .val(
      (zKode ? "Kode: " + zKode + "\n" : "") +
        penerbangan +
        "Penumpang:\n" +
        penumpang +
        "\n" +
        "Harga: " +
        zHarga.rupiah() +
        "\nStatus: " +
        zStatus +
        zLimit,
    )
    .focus()
    .select();
  $("#zKopasDiv button").click(function () {
    $("#" + this.getAttribute("tid")).select();
    document.execCommand("copy");
  });

  //   $("#zKopasDiv").mouseleave(function () {
  //     $("#zKopasDiv").css({
  //       //bottom: "-150px",
  //       right: "-100px",
  //     });
  //   });
  // $("#zKopasDiv").mouseenter(function () {
  // 	$("#zKopasDiv").css({
  // 		//bottom: "0px",
  // 		right: "0px"
  // 	})
  // });
  $("#zKopasText").focus(function () {
    $(this).css("background", "#fff").select();
  });

  var d = new Date();
  var dBl = d.getMonth() + 1;
  var dBl = (dBl < 10 ? "0" : "") + dBl;
  var dTg = d.getDate() + 0;
  var dTg = (dTg < 10 ? "0" : "") + dTg;
  var dJm = d.getHours() + 0;
  var dJm = (dJm < 10 ? "0" : "") + dJm;
  var dMn = d.getMinutes() + 0;
  var dMn = (dMn < 10 ? "0" : "") + dMn;

  var dep = "";
  var arr = "";
  zDepArr.split("|>").forEach(function (A, B) {
    var spl = A.split("->");
    var sp = B > 0 ? "|>" : "";
    dep += sp + spl[0];
    arr += sp + spl[1];
  });
  var simpan = {
    maskapai: maskapaiAplikasi,
    flight: zFlight,
    rute: zRute,
    kode: zKode,
    dep: dep,
    arr: arr,
    penumpang: zPenumpang,
    status: zStatus,
    tglStat: zTglSt,
    nta: zNTA,
    profit: zProfit,
    harga: zHarga,
  };
  $("#zKopasTextApp").val(JSON.stringify(simpan));
  // $("#zKopasExcel").val(Object.values(simpan).join("\t"));
}

//alert($("script:contains('NTA = IDR ')").text().split(" ")[3])

/*##################################################################################################################################
####################################################################################################################################
####################################################################################################################################
####################################################################################################################################*/
