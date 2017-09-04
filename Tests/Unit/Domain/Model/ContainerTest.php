<?php
namespace Datamints\DatamintsWorks\Tests\Unit\Domain\Model;

/**
 * Test case.
 *
 * @author Christian Pschorr <c.pschorr@datamints.com>
 */
class ContainerTest extends \TYPO3\CMS\Core\Tests\UnitTestCase
{
    /**
     * @var \Datamints\DatamintsWorks\Domain\Model\Container
     */
    protected $subject = null;

    protected function setUp()
    {
        parent::setUp();
        $this->subject = new \Datamints\DatamintsWorks\Domain\Model\Container();
    }

    protected function tearDown()
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function getTitleReturnsInitialValueForString()
    {
        self::assertSame(
            '',
            $this->subject->getTitle()
        );
    }

    /**
     * @test
     */
    public function setTitleForStringSetsTitle()
    {
        $this->subject->setTitle('Conceived at T3CON10');

        self::assertAttributeEquals(
            'Conceived at T3CON10',
            'title',
            $this->subject
        );
    }

    /**
     * @test
     */
    public function getCardReturnsInitialValueForCard()
    {
        $newObjectStorage = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        self::assertEquals(
            $newObjectStorage,
            $this->subject->getCard()
        );
    }

    /**
     * @test
     */
    public function setCardForObjectStorageContainingCardSetsCard()
    {
        $card = new \Datamints\DatamintsWorks\Domain\Model\Card();
        $objectStorageHoldingExactlyOneCard = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        $objectStorageHoldingExactlyOneCard->attach($card);
        $this->subject->setCard($objectStorageHoldingExactlyOneCard);

        self::assertAttributeEquals(
            $objectStorageHoldingExactlyOneCard,
            'card',
            $this->subject
        );
    }

    /**
     * @test
     */
    public function addCardToObjectStorageHoldingCard()
    {
        $card = new \Datamints\DatamintsWorks\Domain\Model\Card();
        $cardObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->setMethods(['attach'])
            ->disableOriginalConstructor()
            ->getMock();

        $cardObjectStorageMock->expects(self::once())->method('attach')->with(self::equalTo($card));
        $this->inject($this->subject, 'card', $cardObjectStorageMock);

        $this->subject->addCard($card);
    }

    /**
     * @test
     */
    public function removeCardFromObjectStorageHoldingCard()
    {
        $card = new \Datamints\DatamintsWorks\Domain\Model\Card();
        $cardObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->setMethods(['detach'])
            ->disableOriginalConstructor()
            ->getMock();

        $cardObjectStorageMock->expects(self::once())->method('detach')->with(self::equalTo($card));
        $this->inject($this->subject, 'card', $cardObjectStorageMock);

        $this->subject->removeCard($card);
    }
}
