// Formula https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php
// https://images.slideplayer.com/25/8004672/slides/slide_5.jpg
// https://developers.google.com/chart/interactive/docs/gallery/columnchart

$(document).ready(function(){


    setCurrentDate();

    //$('select').selectmenu();
});

function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


function calcFunction(theForm){
    var startingAmount = parseFloat(theForm.field_1.value);
    var annualInterestRate = parseFloat(theForm.field_2.value);
    var days = parseFloat(theForm.field_3.value);
    var startDate = theForm.field_4.value;
    var endDate = theForm.field_5.value;
    var compounding = parseInt(theForm.field_6.value);
    var daysInYear = parseFloat(theForm.field_7.value);

    var yearInWhole = Math.ceil(days / daysInYear);

    // A = P (1 + r/n) (nt)
    var r = annualInterestRate / 100;
    var n = (compounding);
    var p = 1 + (r/n);
    var pw = (n * yearInWhole);
    var tt = Math.pow(p, pw);
    var bb = startingAmount * tt;

    

    //APY= (1 + r/n )n – 1
    var apy_a = Math.pow(p, n);
    var apy_b = (apy_a - 1);
    var apy = apy_b * 100;

    
    if(compounding === 0){
        var cc_1 = (r * yearInWhole);
        var cc_2 = Math.pow(2.7183, cc_1);
        var cc_3 = (startingAmount * cc_2);
        bb = cc_3;

        apy = (bb - startingAmount)/100;
    }
    

    theForm.field_8.value = currencyFormat((bb - startingAmount));
    theForm.field_9.value = currencyFormat(bb);
    theForm.field_10.value = (apy).toFixed(4) + '%';
    theForm.field_11.value = ((apy)/daysInYear).toFixed(4) + '%';

    $('#st_1').html(currencyFormat((bb - startingAmount)));
    $('#st_2').html(currencyFormat(bb));
    $('#st_3').html((apy).toFixed(4) + '%');
    $('#st_4').html(((apy)/daysInYear).toFixed(4) + '%');

    var ie = (bb - startingAmount);
    createTable(startingAmount,yearInWhole,apy,ie);
}

function setCurrentDate(){
    $('input[name=field_4]').datepicker({ dateFormat: 'mm/dd/yy', changeMonth: true, changeYear: true, minDate: 0 }).datepicker('setDate', new Date());
    $('input[name=field_5]').datepicker({ dateFormat: 'mm/dd/yy', changeMonth: true, changeYear: true, minDate: 0 }).datepicker('setDate', new Date());
}

function addEndDate(val){
    var startDate = $('input[name=field_4]').datepicker('getDate'); 
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + parseInt(val));
    $('input[name=field_5]').datepicker({ dateFormat: 'mm/dd/yy', changeMonth: true, changeYear: true, minDate: 0 }).datepicker('setDate', endDate);
}


function resetFunction(theForm){
    document.compoundCalculator.reset();
    setCurrentDate();
}


function createTable(a,b,c,d){
    $('.report-table table tbody').empty();

    var tdHtml = '<tr><th>Year</th><th>Deposit</th><th>Interest</th><th>Balance</th></tr>'+
                 '<tr><td>Begin</td><td>' + currencyFormat(a) + '</td><td>0</td><td>' + currencyFormat(a) + '</td></tr>';
    var cc = (c/100);
    var aa_i = a;
    for(var i = 0; i <= (b-1); i++){
        var cc_i = (cc * aa_i);
        aa_i = (aa_i + cc_i);
        tdHtml += '<tr><td>' + (i+1) + '</td><td>0</td><td>' + currencyFormat(cc_i) + '</td><td>' + currencyFormat(aa_i) + '</td></tr>';
    }
    tdHtml += '<tr><th>Total</th><th>' + currencyFormat(a) + '</th><th>' + currencyFormat(d) + '</th><th>' + currencyFormat(aa_i) + '</th></tr>';
    
    $(tdHtml).appendTo('.report-table table tbody');
}