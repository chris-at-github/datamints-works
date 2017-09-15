<?php
defined('TYPO3_MODE') || die();

if(!isset($GLOBALS['TCA']['fe_users']['ctrl']['type'])) {
	// no type field defined, so we define it here. This will only happen the first time the extension is installed!!
	$GLOBALS['TCA']['fe_users']['ctrl']['type'] = 'tx_extbase_type';
	$tempColumnstx_datamintsworks_fe_users = [];
	$tempColumnstx_datamintsworks_fe_users[$GLOBALS['TCA']['fe_users']['ctrl']['type']] = [
		'exclude' => true,
		'label'   => 'LLL:EXT:datamints_works_/Resources/Private/Language/locallang_db.xlf:tx_datamintsworks.tx_extbase_type',
		'config'  => [
			'type'       => 'select',
			'renderType' => 'selectSingle',
			'items'      => [
				['', ''],
				['User', 'Tx_DatamintsWorks_User']
			],
			'default'    => 'Tx_DatamintsWorks_User',
			'size'       => 1,
			'maxitems'   => 1,
		]
	];
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('fe_users', $tempColumnstx_datamintsworks_fe_users);
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
	'fe_users',
	$GLOBALS['TCA']['fe_users']['ctrl']['type'],
	'',
	'after:' . $GLOBALS['TCA']['fe_users']['ctrl']['label']
);

//$tmp_datamints_works__columns = [
//
//	'username' => [
//		'exclude' => true,
//		'label'   => 'LLL:EXT:datamints_works_/Resources/Private/Language/locallang_db.xlf:tx_datamintsworks_domain_model_user.username',
//		'config'  => [
//			'type' => 'input',
//			'size' => 30,
//			'eval' => 'trim,required'
//		],
//	],
//
//];
//
//\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('fe_users', $tmp_datamints_works__columns);

/* inherit and extend the show items from the parent class */

if(isset($GLOBALS['TCA']['fe_users']['types']['0']['showitem'])) {
	$GLOBALS['TCA']['fe_users']['types']['Tx_DatamintsWorks_User']['showitem'] = $GLOBALS['TCA']['fe_users']['types']['0']['showitem'];
} elseif(is_array($GLOBALS['TCA']['fe_users']['types'])) {
	// use first entry in types array
	$fe_users_type_definition = reset($GLOBALS['TCA']['fe_users']['types']);
	$GLOBALS['TCA']['fe_users']['types']['Tx_DatamintsWorks_User']['showitem'] = $fe_users_type_definition['showitem'];
} else {
	$GLOBALS['TCA']['fe_users']['types']['Tx_DatamintsWorks_User']['showitem'] = '';
}
//$GLOBALS['TCA']['fe_users']['types']['Tx_DatamintsWorks_User']['showitem'] .= ',--div--;LLL:EXT:datamints_works_/Resources/Private/Language/locallang_db.xlf:tx_datamintsworks_domain_model_user,';
//$GLOBALS['TCA']['fe_users']['types']['Tx_DatamintsWorks_User']['showitem'] .= 'username';

$GLOBALS['TCA']['fe_users']['columns'][$GLOBALS['TCA']['fe_users']['ctrl']['type']]['config']['items'][] = ['LLL:EXT:datamints_works/Resources/Private/Language/locallang_db.xlf:fe_users.tx_extbase_type.Tx_DatamintsWorks_User', 'Tx_DatamintsWorks_User'];
