<?php $view->style('contract', 'extensions/contract/assets/css/contract.css') ?>

<div class="contract">
    <h1>Contract <?= count($names) == 1 ? $names[0] : "to the ".count($names). " of you"; ?></h1>
</div>

<p><?= _c("{0}: No names|one: One name|more: %names% names", count($names), ["%names%" => count($names)]) ?><p>


<?php foreach ($names as $name): ?>
    <p class="uk-alert"><?= __("Contract %name%!", ["%name%" => $name]) ?></p>
<?php endforeach ?>
