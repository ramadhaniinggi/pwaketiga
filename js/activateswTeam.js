// mendaftarkan service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("pendaftaran serviceworker berhasil");
      })
      .catch(function () {
        console.log("pendaftaran serviceworker gagal");
      });
  });
} else {
  console.log("serviceworker belum didukung browser ini");
}

// request api
document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");
  let isSaved = false;

  const item = getTeamById();
  const btnSave = document.getElementById("save");
  const btnDelete = document.getElementById("deleted");

  if (isFromSaved) {
    btnSave.style.display = "none";
    btnDelete.style.display = "block";
    getSavedTeamsById();
  } else {
    getTeamById();
  }

  btnSave.onclick = function () {
    console.log("Tombol FAB Save di klik.");
    item.then(function (team) {
      saveForLater(team);
    });
    M.toast({ html: "Data is saved", classes: "rounded" });
  };

  btnDelete.onclick = function () {
    console.log("Tombol FAB Delete di klik.");
    item.then(function (isToDelete) {
      deleteForLater(isToDelete);
    });
    M.toast({ html: "Data is deleted", classes: "rounded" });
  };
});
