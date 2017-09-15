<?php

namespace Datamints\DatamintsWorks\Domain\Model;

/***
 *
 * This file is part of the "Datamints Works" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2017 Christian Pschorr <c.pschorr@datamints.com>, datamints GmbH
 *
 ***/

/**
 * User
 */
class User extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity {

	/**
	 * username
	 *
	 * @var string
	 * @validate NotEmpty
	 */
	protected $username = '';

	/**
	 * Returns the username
	 *
	 * @return string $username
	 */
	public function getUsername() {
		return $this->username;
	}

	/**
	 * Sets the username
	 *
	 * @param string $username
	 * @return void
	 */
	public function setUsername($username) {
		$this->username = $username;
	}
}
