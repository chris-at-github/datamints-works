<?php

$EM_CONF[$_EXTKEY] = [
	'title' => 'Datamints Works',
	'description' => '',
	'category' => 'plugin',
	'author' => 'Christian Pschorr',
	'author_email' => 'c.pschorr@datamints.com',
	'state' => 'alpha',
	'internal' => '',
	'uploadfolder' => '0',
	'createDirs' => '',
	'clearCacheOnLoad' => 0,
	'version' => '0.0.1',
	'constraints' => [
		'depends' => [
			'typo3' => '8.7.0-8.7.99',
		],
		'conflicts' => [],
		'suggests' => [],
	],
	'autoload' => [
		'psr-4' => [
			'Datamints\\DatamintsWorks\\' => 'Classes',
		],
	],
];