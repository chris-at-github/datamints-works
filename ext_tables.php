<?php
defined('TYPO3_MODE') || die('Access denied.');

call_user_func(function() {

  \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'Datamints.DatamintsWorks',
    'Frontend',
    'Works Frontend'
  );

  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile('datamints_works', 'Configuration/TypoScript', 'Datamints Works');

  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_datamintsworks_domain_model_board', 'EXT:datamints_works/Resources/Private/Language/locallang_csh_tx_datamintsworks_domain_model_board.xlf');
  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_datamintsworks_domain_model_board');

  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_datamintsworks_domain_model_container', 'EXT:datamints_works/Resources/Private/Language/locallang_csh_tx_datamintsworks_domain_model_container.xlf');
  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_datamintsworks_domain_model_container');

  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_datamintsworks_domain_model_card', 'EXT:datamints_works/Resources/Private/Language/locallang_csh_tx_datamintsworks_domain_model_card.xlf');
  \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_datamintsworks_domain_model_card');

});