<?php
defined('TYPO3_MODE') || die('Access denied.');

call_user_func(function() {
	\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
		'Datamints.DatamintsWorks',
		'Frontend',
		[
			'Board' => 'index',
		],

		// non-cacheable actions
		[
			'Board' => '',
		]
	);

	\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
		'Datamints.DatamintsWorks',
		'Api',
		[
			'Api\Application' => 'index',
			'Api\Board' => 'get',
		],

		// non-cacheable actions
		[
			'Api\Application' => 'index',
			'Api\Board' => 'get',
		]
	);

	// wizards
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
		'mod {
			wizards.newContentElement.wizardItems.plugins {
				elements {
					frontend {
						iconIdentifier = datamints_works-plugin-frontend
						title = LLL:EXT:datamints_works/Resources/Private/Language/locallang_db.xlf:tx_datamints_works_frontend.name
						description = LLL:EXT:datamints_works/Resources/Private/Language/locallang_db.xlf:tx_datamints_works_frontend.description
						tt_content_defValues {
							CType = list
							list_type = datamintsworks_frontend
						}
					}
				}
				show = *
			}
	   }'
	);

	$iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
	$iconRegistry->registerIcon(
		'datamints_works-plugin-frontend',
		\TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
		['source' => 'EXT:datamints_works/Resources/Public/Icons/user_plugin_frontend.svg']
	);
});