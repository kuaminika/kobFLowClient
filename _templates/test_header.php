<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="tools.js?v1"></script>
    
    <script src="testList.js?<?php echo gettimeofday()["sec"] ?>"></script>
    <link rel="stylesheet" href="style.css?<?php echo gettimeofday()["sec"] ?>">
    <title>KobFlowTests</title>
</head>
<body>
    <nav class="d-flex">
        <div> <a href="merchant.php" >Merchant</a>   </div>
        <div> <a href="income.php" >Income</a>   </div>
        <div> <a href="expense.php" >Expenese</a>   </div>
        <div> <a href="kobholder.php" >kob holder</a>   </div>
        <div> <a href="expenseCategory.php" >Expense category</a>   </div>
        <div> <a href="incomeCategory.php" >Income category</a>   </div>
        <div> <a href="incomeSources.php" >Income sources</a>   </div>
    </nav>

    <h1>  <?php echo isset($title)?$title:"" ;?></h1>