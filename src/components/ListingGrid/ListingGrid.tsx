import {
  getAllValidAuctions,
  getAllValidListings,
} from "thirdweb/extensions/marketplace";
import { NFT as NFTType, ThirdwebContract } from "thirdweb";
import React, { Suspense } from "react";
import { MARKETPLACE, NFT_COLLECTION } from "../../app/const/contracts";
import NFTGrid, { NFTGridLoading } from "../NFT/NFTGrid";

type Props = {
	marketplace: ThirdwebContract;
	collection: ThirdwebContract;
	overrideOnclickBehavior?: (nft: NFTType) => void;
	emptyText: string;
};

export default async function ListingGrid(props: Props) {
  const listingsPromise = getAllValidListings({
    contract: MARKETPLACE,
  });
  const auctionsPromise = getAllValidAuctions({
    contract: MARKETPLACE,
  });

  const [listings, auctions] = await Promise.all([
    listingsPromise,
    auctionsPromise,
  ]);

  // Retrieve all NFTs from the listings
  const tokenIds = Array.from(
    new Set([
      ...listings
        .filter(
          (l) => l.assetContractAddress === NFT_COLLECTION.address
        )
        .map((l) => l.tokenId),
      ...auctions
        .filter(
          (a) => a.assetContractAddress === NFT_COLLECTION.address
        )
        .map((a) => a.tokenId),
    ])
  );

  const nftData = tokenIds.map((tokenId) => {
    return {
      tokenId: tokenId,
      directListing: listings.find(
        (listing) => listing.tokenId === tokenId
      ),
      auctionListing: auctions.find(
        (listing) => listing.tokenId === tokenId
      ),
    };
  });

  return (
    <Suspense fallback={<NFTGridLoading />}>
      <NFTGrid
        nftData={nftData}
        emptyText={props.emptyText}
        overrideOnclickBehavior={props.overrideOnclickBehavior}
      />
    </Suspense>
  );
}
//<model-viewer src="https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeifs3wttnckwbtjpm4pt2dlz7uq3z2l56vidrf3uvuxr5w2rvydjiu/untitled.glb" alt="Chinese Temple " camera-controls="true" poster="ipfs://QmaNsJzEARRrETZ7whyY1Vqrp2Wxs7yKnW1oytzxpvWrgL/Chinese%20Building%20.png" ar-status="not-presenting" style="width: 100%; height: 100%;"></model-viewer>