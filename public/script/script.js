


function updateGameList(data) {
  $('#gameList').empty();

  data.forEach(game => {
    const card = `
    <div class="card mb-4 box-shadow boxs">
    <center>
      <div class="card-header">
        <h4 class="my-0 font-weight-normal"><b>${game.GameName} !</b></h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title"><b>${game.VoteCount}</b> <small class="text-muted">VOTE</small></h1>
        <img src="${game.ImageURL}" alt="Game Image" class="img-fluid" style="border-radius: 10px;">
        <br><br>
        <a href="/api/vote?game_name=${game.GameName}" class="btn btn-md btn-block btn-outline-primary"><b>VOTE</b></a>
      </div>
      </center>
    </div>
    `;
    $('#gameList').append(card);
  });
}
function fetchData() {
  $.ajax({
    url: 'https://vote-game.vercel.app/api/fetch/status',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      updateGameList(data);
    },
    error: function(error) {
      console.error('Error fetching data:', error);
    }
  });
}
fetchData();
setInterval(fetchData, 5000);
