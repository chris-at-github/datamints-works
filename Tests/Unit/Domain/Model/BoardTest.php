<?php
namespace Datamints\DatamintsWorks\Tests\Unit\Domain\Model;

/**
 * Test case.
 *
 * @author Christian Pschorr <c.pschorr@datamints.com>
 */
class BoardTest extends \TYPO3\CMS\Core\Tests\UnitTestCase
{
    /**
     * @var \Datamints\DatamintsWorks\Domain\Model\Board
     */
    protected $subject = null;

    protected function setUp()
    {
        parent::setUp();
        $this->subject = new \Datamints\DatamintsWorks\Domain\Model\Board();
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
    public function getContainerReturnsInitialValueForContainer()
    {
        $newObjectStorage = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        self::assertEquals(
            $newObjectStorage,
            $this->subject->getContainer()
        );
    }

    /**
     * @test
     */
    public function setContainerForObjectStorageContainingContainerSetsContainer()
    {
        $container = new \Datamints\DatamintsWorks\Domain\Model\Container();
        $objectStorageHoldingExactlyOneContainer = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        $objectStorageHoldingExactlyOneContainer->attach($container);
        $this->subject->setContainer($objectStorageHoldingExactlyOneContainer);

        self::assertAttributeEquals(
            $objectStorageHoldingExactlyOneContainer,
            'container',
            $this->subject
        );
    }

    /**
     * @test
     */
    public function addContainerToObjectStorageHoldingContainer()
    {
        $container = new \Datamints\DatamintsWorks\Domain\Model\Container();
        $containerObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->setMethods(['attach'])
            ->disableOriginalConstructor()
            ->getMock();

        $containerObjectStorageMock->expects(self::once())->method('attach')->with(self::equalTo($container));
        $this->inject($this->subject, 'container', $containerObjectStorageMock);

        $this->subject->addContainer($container);
    }

    /**
     * @test
     */
    public function removeContainerFromObjectStorageHoldingContainer()
    {
        $container = new \Datamints\DatamintsWorks\Domain\Model\Container();
        $containerObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->setMethods(['detach'])
            ->disableOriginalConstructor()
            ->getMock();

        $containerObjectStorageMock->expects(self::once())->method('detach')->with(self::equalTo($container));
        $this->inject($this->subject, 'container', $containerObjectStorageMock);

        $this->subject->removeContainer($container);
    }
}
