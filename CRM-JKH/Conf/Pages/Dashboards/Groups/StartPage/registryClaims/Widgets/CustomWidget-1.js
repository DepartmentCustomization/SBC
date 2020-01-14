(function () {
  return {
    title: [],
    hint: '',
    formatTitle: function() {},
    customConfig:
                `
                <style>
                  .newbutton {
                      width: 250px;
                      height: 49px;
                      cursor: pointer;
                  }

                  .newbutton {
                    border-radius: 5px !important;
                    background: linear-gradient(#f1f0f0, #ffffff, #f1f0f0);
                    transition: 0.1s;
                    text-shadow: 0 -1px 0 #D3D3D3;
                    color: #676362;
                  }
                  
                  .newbutton:hover {
                    background: linear-gradient(#ffffff, #d9dada);
                    transition: 0.1s;
                  }
                  
                  .newbutton:active {
                    background: linear-gradient(#d9dada, #d9dada);
                    border: 2px inset #f0f0f0;
                  }


                </style>

                <input name="The Button" type="button" class='newbutton' id="btn_sendAllClaimToWork" value='Передати все в роботу'>
                `
    ,
    afterViewInit: function() {
        document.getElementById('btn_block_hiden').style.display = 'none';
    },
    init: function() {
    },
    load: function() {
    }
};
}());
