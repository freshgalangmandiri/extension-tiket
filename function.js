function CopyList(A) {
  TextKonf.value = A;
  TextKonf.select();
  document.execCommand("copy");
}
//Get Bulan
zBulan = {
  Panjang: [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  Pendek: [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ],
  ToText: function (A = 0, B = "pendek") {
    var B = B == "pendek" ? this.Pendek : this.Panjang;
    A += "";
    if (A.trim() == "") A = 0;
    return B[parseInt(A)];
  },
};
//==Selector Contains
function Contains(A, B) {
  hs = false;
  [].forEach.call(qsa(A), function (z) {
    if (z.innerText.toLowerCase().indexOf(B.toLowerCase()) > -1 && hs == false)
      hs = z;
  });
  return hs;
}
//==Title Case
Object.defineProperty(String.prototype, "toTitleCase", {
  get: function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
});
//==Get Attribute

Object.defineProperty(Object.prototype, "Text", {
  get: function () {
    return this.innerText.trim();
  },
});
Object.defineProperty(Object.prototype, "Html", {
  get: function () {
    return this.innerHTML;
  },
});
Object.prototype.FindText = function (A = "") {
  console.log([...this]);

  return [...this]?.find((el) =>
    el.textContent
      .replace(/\s/g, "")
      .toLowerCase()
      .includes(A.replace(/\s/g, "").toLowerCase()),
  );
};
Object.prototype.Contains = function (A = "") {
  hs = false;
  [].forEach.call(this, function (z) {
    if (z.innerText.toLowerCase().indexOf(A.toLowerCase()) > -1 && hs == false)
      hs = z;
  });

  return hs;
};
HTMLElement.prototype.Attr = function (A = "") {
  var d = this.HasAttr(A) ? this.getAttribute(A) : false;
  return d;
};
//==Set Attribute
HTMLElement.prototype.AddAttr = function (A = "", B = "") {
  var d = this.setAttribute(A, B);
  return d;
};
//==remove Attribute
HTMLElement.prototype.DelAttr = function (A = "") {
  if (this.HasAttr(A)) this.removeAttribute(A);
  return 1;
};
//==Has Attribute
HTMLElement.prototype.HasAttr = function (A = "") {
  return this.hasAttribute(A);
};
//==Data Input
HTMLElement.prototype.DataInp = function (A = "") {
  var d = this.getAttribute("data");
  return A == "" ? d : d == A;
};
//==Menambah Nol(0) di Depan jika kurang dari 10
Object.defineProperty(Number.prototype, "AddNol", {
  get: function () {
    var h = this.toString().padStart(2, "0");
    // var h = (h < 10 ? "0" : "") + h;
    return h;
  },
});
Object.defineProperty(String.prototype, "AddNol", {
  get: function () {
    var h = parseInt(this).toString().padStart(2, "0");
    // var h = (h < 10 ? "0" : "") + h;
    return h;
  },
});
//==Merubah Nomer ke Tanggal Panjang
Object.defineProperty(String.prototype, "TglPanjang", {
  get: function () {
    var T = this.split(".");
    var Tg = typeof T[2] == "undefined" ? "00" : T[2].AddNol;
    var Tg = Tg == "00" ? "n/a" : Tg;
    var Bl = typeof T[1] == "undefined" ? "00" : zBulan.ToText(T[1], "Panjang");
    return Tg + " " + Bl + " " + T[0]; /**/
  },
});
//==Merubah Nomer ke Tanggal Pendek
Object.defineProperty(String.prototype, "TglPendek", {
  get: function () {
    var T = this.split(".");
    Bln = zBulan.ToText(T[1]);
    return T[2] + "" + Bln + "" + T[0].substr(2, 2);
  },
});
//==Merubah Nomer ke Tanggal Update
Object.defineProperty(String.prototype, "TglUpdate", {
  get: function () {
    var t = this;
    var h = "";
    if (t.length == 14) {
      var h =
        (t.substr(0, 4) + "." + t.substr(4, 2) + "." + t.substr(6, 2))
          .TglPendek +
        ", " +
        t.substr(8, 2) +
        ":" +
        t.substr(10, 2) +
        ":" +
        t.substr(12, 2);
    }
    return h;
  },
});
//==Mencari Index Childs
Object.defineProperty(HTMLElement.prototype, "Index", {
  get: function () {
    var el = this.previousElementSibling;
    var no = 0;
    while (el !== null) {
      el = el.previousElementSibling;
      no++;
    }
    return no;
  },
});
//==Mencari Parent Tagname
HTMLElement.prototype.ParTag = function (A, B = 0) {
  A = A.toUpperCase();
  var El = this;
  while (El.tagName != A && El.tagName != "BODY") var El = El.parentElement;
  return B == 1 ? El.tagName == A : El;
};
//==Mencari Parent Class
HTMLElement.prototype.ParClass = function (A, B = 0) {
  var El = this;
  while (!El.classList.contains(A) && El.tagName != "BODY")
    var El = El.parentElement;
  return B == 1 ? El.classList.contains(A) : El;
};
//==Mencari Parent ID
HTMLElement.prototype.ParId = function (A, B = 0) {
  var El = this;
  while (El.id !== A && El.tagName != "BODY") var El = El.parentElement;
  return B == 1 ? El.id == A : El;
};
//==Query Selector
function qs(A) {
  return document.querySelector(A);
}
HTMLElement.prototype.qs = function (A) {
  return this.querySelector(A);
};
//==Query Selector ALL
function qsa(A) {
  return document.querySelectorAll(A);
}
HTMLElement.prototype.qsa = function (A) {
  return this.querySelectorAll(A);
};
Object.defineProperty(HTMLElement.prototype, "Next", {
  get: function () {
    return this.nextElementSibling;
  },
});
//==Get Semua Value Childs ## getVal ##
Object.defineProperty(HTMLElement.prototype, "getVal", {
  get: function () {
    getHsl = {};
    var Ini = this;
    var In = Ini.qsa("[name]");
    [].forEach.call(In, function (A, B) {
      if (
        A.name == "tanggal" &&
        Ini.qsa("[name='bulan']").length &&
        Ini.qsa("[name='tahun']").length
      ) {
        getHsl[JS.Data == "Peserta" ? "tanlah" : "tanggal"] =
          In[B + 2].value + "." + In[B + 1].value + "." + A.value;
      } else if (
        (A.name == "bulan" &&
          !Ini.qsa("[name='tanggal']").length &&
          !Ini.qsa("[name='tahun']").length) ||
        (A.name == "tahun" &&
          !Ini.qsa("[name='tanggal']").length &&
          !Ini.qsa("[name='bulan']").length) ||
        (A.name !== "bulan" && A.name !== "tahun")
      ) {
        getHsl[A.name] = A.value;
        if (A.HasAttr("z")) getHsl["z_" + A.name] = A.Attr("z");
      }
    });
    return getHsl;
  },
});
//==SHOW HIDE
Object.defineProperty(HTMLElement.prototype, "Hide", {
  get: function () {
    this.style.display = "none";
  },
});
Object.defineProperty(HTMLElement.prototype, "Show", {
  get: function () {
    this.style.display = "inline-block";
  },
});
//==SORT OBJECT
Object.defineProperty(Object.prototype, "SortAZ", {
  get: function () {
    var z = [];
    for (var key in this)
      if (this.hasOwnProperty(key)) z.push([key, this[key]]); // each item is an array in format [key, value]

    // sort items by value
    z.sort(function (a, b) {
      var x = a[1].toLowerCase(),
        y = b[1].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    return z;
  },
});
Object.defineProperty(Object.prototype, "SortZA", {
  get: function () {
    var z = [];
    for (var key in this)
      if (this.hasOwnProperty(key)) z.push([key, this[key]]); // each item is an array in format [key, value]

    // sort items by value
    z.sort(function (a, b) {
      var x = a[1].toLowerCase(),
        y = b[1].toLowerCase();
      return x < y ? 1 : x > y ? -1 : 0;
    });
    return z;
  },
});
//REMOVE
Object.defineProperty(Object.prototype, "Remove", {
  get: function () {
    this.parentElement.removeChild(this);
  },
});

//========== Array Huruf dan Angka===>
huruf = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
angka = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//============ Format Tanggal
Date.prototype.tanggal = function (a = "tgl") {
  if (a == "num") {
    return (
      this.getFullYear().toString() +
      (this.getMonth() + 1).AddNol +
      this.getDate().AddNol +
      this.getHours().AddNol +
      this.getMinutes().AddNol
    );
  }
};
String.prototype.tanggal = function (a = "tgl") {
  var bulan = [
    "-",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
  // var tanggal = this.substring(6, 8) + " " + bulan[this.substring(4, 6) * 1] + " " + this.substring(2, 4);
  var tanggal =
    this.substring(6, 8) +
    " " +
    bulan[parseInt(this.substring(4, 6)) * 1] +
    " " +
    this.substring(2, 4);
  var jam = this.substring(8, 10) + ":" + this.substring(10, 12);
  if (a == "tgl") {
    x = tanggal;
  } else if (a == "num") {
    var spl = this.replace(/(-|,|\.)/g, "").split(" ");
    var jam = "";
    if (spl.length > 3) var jam = spl[3].replace(/:/g, "");
    var th = spl[2];

    if (th?.length == 2) th = "20" + th;
    x = th + spl[1].bulan() + spl[0].sepuluh() + jam;
  } else if (a == "jam") {
    x = jam;
  }
  //else if(a=="hari"){ x=this.substring(0,4)+","+this.substring(4,
  else if (a == "hari") {
    x =
      hari[
        new Date(
          this.substring(0, 4) +
            "," +
            this.substring(4, 6) +
            "," +
            this.substring(6, 8),
        ).getDay()
      ];
  } else if (a == "jamTgl") {
    x = jam + ", " + tanggal;
  } else if (a == "tglJam") {
    x = tanggal + ", " + jam;
  }
  return x;
};
//============ Format harga
String.prototype.rupiah = function () {
  var y = this;
  var x = "";
  var n = 0;
  for (var z = y.length - 1; z > -1; z--) {
    var ttk = "";
    if (n == 3) {
      var ttk = ".";
      var n = 0;
    }
    x = y[z] + ttk + x;

    n++;
  }
  return x;
};
//==== Bulan ========
String.prototype.bulan = function () {
  let a = this.toLowerCase().substring(0, 3);
  if (a == "agt") a = "aug";
  let bl1 = [
    "-",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let bl2 = [
    "-",
    "jan",
    "feb",
    "mar",
    "apr",
    "mei",
    "jun",
    "jul",
    "agu",
    "sep",
    "okt",
    "nop",
    "des",
  ];
  let bla = $.inArray(a, bl1);
  let blb = $.inArray(a, bl2);
  let bl = bla;
  if (bl == -1) {
    bl = blb;
  }
  if (bl == -1) {
    bl = 0;
  }

  if (bl < 10) {
    bl = "0" + bl;
  }
  return bl;
};
//==== Tahun ========
String.prototype.tahun = function () {
  var d = new Date();
  var th = d.getFullYear();
  if (
    d.getMonth() + 1 >
    parseInt(this.trim().toLowerCase().substring(0, 3).bulan())
  )
    th++;
  return th;
};
//==== Tanggal Jam Lebih dari 10========
String.prototype.sepuluh = function () {
  var x = parseInt(this) * 1;
  if (x < 10) {
    x = "0" + x;
  }
  return x;
};
//==== Tanggal Jam Lebih dari 10========
String.prototype.jam = function () {
  var tik = this.split(".");
  if (this.indexOf(".") == -1) {
    var tik = this.split(":");
  }
  x = tik[0].sepuluh() + "" + tik[1].sepuluh();
  return x;
};
//==== Untuk Pemisah Pertama tidak ada========
function batas(a, b, c) {
  x = "";
  if (a > b) {
    x = c;
  }
  return x;
}
//==== Kapital
String.prototype.kapital = function () {
  var txt = this.toLowerCase().split(" ");
  var tx = "";
  var x;
  for (x in txt) {
    if (!txt.hasOwnProperty(x)) continue;
    tx += txt[x].charAt(0).toUpperCase() + txt[x].slice(1) + " ";
  }
  return tx.trim();
};
function ck(a) {
  if (a.indexOf("=") > -1) {
    document.cookie = a;
  } else {
    var hs = 0;
    var dc = document.cookie.split(";");
    for (var z = 0; z < dc.length; z++) {
      var ck = dc[z].split("=");
      if (ck[0].trim() == a) hs = ck[1];
    }
    return hs;
  }
}
/*chrome.runtime.sendMessage({
	from:    'content',
	subject: 'showPageAction'
});*/

url = document.URL.toLowerCase();
function cek(a) {
  var hsl = 0;
  if (url.indexOf(a) > -1) var hsl = 1;
  return hsl;
}
