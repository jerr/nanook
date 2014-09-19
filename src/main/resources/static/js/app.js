/*
 * Copyright 2014 EsmerilProgramming.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
var cloverxell = {
  send : function() {
    var inputCommand = new Object();
    inputCommand.command = $("#inputCommand").val();
    $.ajax({
      url : "app/send",
      data : inputCommand,
      type : "POST",
      dataType : "html",
      success : function(response) {
        var html = ansi_up.ansi_to_html(response);
        
        var ps1 = "[" + window.location.hostname + "@" + html.split("@",2)[1] + "]$";
        $('#commandPrompt').html(ps1);
        
        html = html.replace(inputCommand.command,'');
        html = html.replace('\n','');
        html = html.split("@",1);
        $("#commandResult").val(html);
      },
      error : function(xhr, st, err) {
        console.log("Error: " + err);
        console.log("Status: " + st);
        console.dir(xhr);
      }
    });
  },
  stop : function() {
    $.ajax({url : "app/stop"});
  }
};

$('#commandForm').submit(function(event) {
  event.preventDefault();
  cloverxell.send();
});

$(window).unload(function() {
  cloverxell.stop();
});
