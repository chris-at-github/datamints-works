<?php
namespace Datamints\DatamintsWorks\View;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility as DebuggerUtility;

/**
 * A JSON view
 *
 * @see: https://usetypo3.com/json-view.html
 */
class JsonView extends \TYPO3\CMS\Extbase\Mvc\View\JsonView {

	/**
	 * The rendering configuration for this JSON view which
	 * determines which properties of each variable to render.
	 *
	 * The configuration array must have the following structure:
	 *
	 * Example 1:
	 *
	 * array(
	 *		'variable1' => array(
	 *			'_only' => array('property1', 'property2', ...)
	 *		),
	 *		'variable2' => array(
	 *	 		'_exclude' => array('property3', 'property4, ...)
	 *		),
	 *		'variable3' => array(
	 *			'_exclude' => array('secretTitle'),
	 *			'_descend' => array(
	 *				'customer' => array(
	 *					'_only' => array('firstName', 'lastName')
	 *				)
	 *			)
	 *		),
	 *		'somearrayvalue' => array(
	 *			'_descendAll' => array(
	 *				'_only' => array('property1')
	 *			)
	 *		)
	 * )
	 *
	 * Of variable1 only property1 and property2 will be included.
	 * Of variable2 all properties except property3 and property4
	 * are used.
	 * Of variable3 all properties except secretTitle are included.
	 *
	 * If a property value is an array or object, it is not included
	 * by default. If, however, such a property is listed in a "_descend"
	 * section, the renderer will descend into this sub structure and
	 * include all its properties (of the next level).
	 *
	 * The configuration of each property in "_descend" has the same syntax
	 * like at the top level. Therefore - theoretically - infinitely nested
	 * structures can be configured.
	 *
	 * To export indexed arrays the "_descendAll" section can be used to
	 * include all array keys for the output. The configuration inside a
	 * "_descendAll" will be applied to each array element.
	 *
	 *
	 * Example 2: exposing object identifier
	 *
	 * array(
	 *		'variableFoo' => array(
	 *			'_exclude' => array('secretTitle'),
	 *			'_descend' => array(
	 *				'customer' => array(    // consider 'customer' being a persisted entity
	 *					'_only' => array('firstName'),
	 * 					'_exposeObjectIdentifier' => TRUE,
	 * 					'_exposedObjectIdentifierKey' => 'guid'
	 *				)
	 *			)
	 *		)
	 * )
	 *
	 * Note for entity objects you are able to expose the object's identifier
	 * also, just add an "_exposeObjectIdentifier" directive set to TRUE and
	 * an additional property '__identity' will appear keeping the persistence
	 * identifier. Renaming that property name instead of '__identity' is also
	 * possible with the directive "_exposedObjectIdentifierKey".
	 * Example 2 above would output (summarized):
	 * {"customer":{"firstName":"John","guid":"892693e4-b570-46fe-af71-1ad32918fb64"}}
	 *
	 *
	 * Example 3: exposing object's class name
	 *
	 * array(
	 *		'variableFoo' => array(
	 *			'_exclude' => array('secretTitle'),
	 *			'_descend' => array(
	 *				'customer' => array(    // consider 'customer' being an object
	 *					'_only' => array('firstName'),
	 * 					'_exposeClassName' => TYPO3\Flow\Mvc\View\JsonView::EXPOSE_CLASSNAME_FULLY_QUALIFIED
	 *				)
	 *			)
	 *		)
	 * )
	 *
	 * The ``_exposeClassName`` is similar to the objectIdentifier one, but the class name is added to the
	 * JSON object output, for example (summarized):
	 * {"customer":{"firstName":"John","__class":"Acme\Foo\Domain\Model\Customer"}}
	 *
	 * The other option is EXPOSE_CLASSNAME_UNQUALIFIED which only will give the last part of the class
	 * without the namespace, for example (summarized):
	 * {"customer":{"firstName":"John","__class":"Customer"}}
	 * This might be of interest to not provide information about the package or domain structure behind.
	 *
	 * @var array
	 */
	protected $configuration = [
		'boards' => [
			'_descendAll' => [
				'_only' => ['uid', 'title'],
			]
		],

		'board' => [
			'_only' => ['uid', 'title', 'container'],
			'_descend' => [
				'container' => [
					'_descendAll' => [
						'_only' => ['uid', 'title']
					]
				]
			],
		],
	];

	/**
	 * Always transforming ObjectStorages to Arrays for the JSON view
	 *
	 * @param mixed $value
	 * @param array $configuration
	 * @return array
	 */
	protected function transformValue($value, array $configuration)	{
		if($value instanceof \TYPO3\CMS\Extbase\Persistence\ObjectStorage || $value instanceof \TYPO3\CMS\Extbase\Persistence\Generic\LazyObjectStorage) {
			$value = $value->toArray();
		}

		return parent::transformValue($value, $configuration);
	}
}
