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
 * Container
 */
class Container extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity
{
    /**
     * title
     * 
     * @var string
     * @validate NotEmpty
     */
    protected $title = '';

    /**
     * card
     * 
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\Datamints\DatamintsWorks\Domain\Model\Card>
     */
    protected $card = null;

    /**
     * __construct
     */
    public function __construct()
    {
        //Do not remove the next line: It would break the functionality
        $this->initStorageObjects();
    }

    /**
     * Initializes all ObjectStorage properties
     * Do not modify this method!
     * It will be rewritten on each save in the extension builder
     * You may modify the constructor of this class instead
     * 
     * @return void
     */
    protected function initStorageObjects()
    {
        $this->card = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
    }

    /**
     * Returns the title
     * 
     * @return string $title
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Sets the title
     * 
     * @param string $title
     * @return void
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Adds a Card
     * 
     * @param \Datamints\DatamintsWorks\Domain\Model\Card $card
     * @return void
     */
    public function addCard(\Datamints\DatamintsWorks\Domain\Model\Card $card)
    {
        $this->card->attach($card);
    }

    /**
     * Removes a Card
     * 
     * @param \Datamints\DatamintsWorks\Domain\Model\Card $cardToRemove The Card to be removed
     * @return void
     */
    public function removeCard(\Datamints\DatamintsWorks\Domain\Model\Card $cardToRemove)
    {
        $this->card->detach($cardToRemove);
    }

    /**
     * Returns the card
     * 
     * @return \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\Datamints\DatamintsWorks\Domain\Model\Card> $card
     */
    public function getCard()
    {
        return $this->card;
    }

    /**
     * Sets the card
     * 
     * @param \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\Datamints\DatamintsWorks\Domain\Model\Card> $card
     * @return void
     */
    public function setCard(\TYPO3\CMS\Extbase\Persistence\ObjectStorage $card)
    {
        $this->card = $card;
    }
}
