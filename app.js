$(document).ready(function(){
    $("#submit").click(function(e){
        e.preventDefault();
    
        var input = $("#dob-input").val();
        var dob = new Date(input);
        save(dob);
        renderAgeLoop();
    });

    var save = function(dob)
    {
        localStorage.dob = dob.getTime();
    };

    var load = function()
    {
        var value;
        if (value = localStorage.dob)
            return new Date(parseInt(value));
        return -1;
    };

    var renderAgeLoop = function()
    {
        var dob = load();
        $("#choose").css("display", "none");
        $("#timer").css("display", "block");

        setInterval(function(){
            var age = getAge(dob);
            $("#age").html(age.year + "<sup>." + age.ms + "</sup>");
        }, 100);
    };

    var renderChoose = function()
    {
        $("#choose").css("display", "block");
    };

    var getAge = function(dob){
      var now       = new Date;
      var duration  = now - dob;
      var years     = duration / 31556900000;
    
      var majorMinor = years.toFixed(9).toString().split('.');
    
      return {
          "year": majorMinor[0],
          "ms": majorMinor[1]
      }
    };

    function main() {
        if (load() != -1)
        {
            renderAgeLoop();
        } else {
            renderChoose();
        }
    };
    main();
});