import { formatCityStateSlug, formatSlugToTitle, isCityStateSlug } from "@/utils/listing"
import { IWPCategory } from "@/app/Dashboard/MyListing/AddNewListing/MyListingProviderEditor";

export default function ProductsQuickFacts(
  { slugs = [], params = {}, category = null }
    : { slugs?: string[], params?: { [key: string]: string }, category: IWPCategory | null }
) {

  /**
   * So this products quick facts are comming from the database, and they should
   * appear only on the first page of the results.
   */


  console.log("slugs products quick facts:", slugs);

  /**
   * ===== ONlY for CITY, STATE ====
   */
  if (slugs.length === 1 && isCityStateSlug(slugs[0])) {
    return <>
      <section className="tldr-summary-panel product-quick-facts" aria-labelledby="tldr-heading">
        <h2 id="tldr-heading">Quick Facts & Overview</h2>
        <div className="facts-grid">
          <div>
            <p>
              Navigating end-of-life arrangements requires understanding local options and requirements.
              Here is a quick overview for end-of-life service providers in {formatCityStateSlug(slugs[0])}:
            </p>
          </div>
          <div>
            <ul>
              <li><strong>Average Local Costs:</strong> Varies by service type in {formatCityStateSlug(slugs[0])}; direct options and traditional arrangements range significantly based on custom family selections.</li>
              <li><strong>Key Planning Tip:</strong> Always request a General Price List (GPL) upfront from providers in the {formatCityStateSlug(slugs[0])} area before committing to final arrangements.</li>
              <li><strong>Regulatory Standards:</strong> Licensed professionals serving {formatCityStateSlug(slugs[0])} must comply with state consumer protection guidelines and funeral service regulations.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  }

  if (slugs.length === 1 && slugs[0] === 'providers') {
    return (
      <>
        <section className="tldr-summary-panel product-quick-facts" aria-labelledby="tldr-heading">
          <h2 id="tldr-heading">Quick Facts & Overview</h2>
          <div className="facts-grid">
            <div>
              <p>
                Navigating end-of-life arrangements requires understanding available options and industry requirements.
                Here is a quick overview for nationwide end-of-life service providers:
              </p>
            </div>
            <div>
              <ul>
                <li><strong>Average National Costs:</strong> Varies by service type; direct cremation, traditional burials, and celebration-of-life options range significantly based on custom selections.</li>
                <li><strong>Key Planning Tip:</strong> Always request a General Price List (GPL) upfront before committing to final arrangements with any professional provider.</li>
                <li><strong>Regulatory Standards:</strong> Licensed final arrangement professionals across the network must comply with state and federal consumer protection guidelines for funeral services.</li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (slugs.length === 2 && category !== null) {
    // Parse your slugs (adjust the indices based on your URL structure e.g., [city, category] or [category, city])
    const rawCategory = slugs[1];
    const rawCity = slugs[0];

    const formattedCategory = formatSlugToTitle(rawCategory);

    const formattedCity = formatCityStateSlug(rawCity);

    return (
      <>
        <section className="tldr-summary-panel product-quick-facts" aria-labelledby="tldr-heading">
          <h2 id="tldr-heading">Quick Facts & Overview</h2>
          <div className="facts-grid">
            <div>
              <p>
                Navigating end-of-life arrangements requires understanding local options and requirements.
                Here is a quick overview for <strong>{category.name}</strong> providers in {formattedCity}:
              </p>
              {
                category.description !== "" && <p dangerouslySetInnerHTML={{ __html: category.description }} />
              }
            </div>
            <div>
              <ul>
                <li><strong>Average Local Costs:</strong> Varies by service type for {category.name} in {formattedCity}; pricing ranges significantly based on custom family selections.</li>
                <li><strong>Key Planning Tip:</strong> Always request a General Price List (GPL) upfront from {category.name} professionals in the {formattedCity} area before committing.</li>
                <li><strong>Regulatory Standards:</strong> Licensed final arrangement professionals serving {formattedCity} must comply with state consumer protection guidelines and funeral service regulations.</li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }


  if (slugs.length === 1 && slugs[0] !== 'providers' && category !== null) {
    const rawCategory = slugs[0];
    const formattedCategory = formatSlugToTitle(rawCategory);

    return (
      <>
        <section className="tldr-summary-panel product-quick-facts" aria-labelledby="tldr-heading">
          <h2 id="tldr-heading">Quick Facts & Overview</h2>
          <div className="facts-grid">
            <div>
              <p>
                Navigating end-of-life arrangements requires understanding professional options and industry requirements.
                Here is a quick overview for <strong>{category.name}</strong> services:
              </p>
              {
                category.description !== "" && <p dangerouslySetInnerHTML={{ __html: category.description }} />
              }
            </div>
            <div>
              <ul>
                <li><strong>Average Industry Costs:</strong> Varies by service type for {category.name}; direct arrangements and custom selections range significantly based on family needs.</li>
                <li><strong>Key Planning Tip:</strong> Always request a General Price List (GPL) upfront from providers before committing to final arrangements.</li>
                <li><strong>Regulatory Standards:</strong> Licensed professionals offering {category.name} options must comply with state consumer protection guidelines and funeral service regulations.</li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }



  return <></>
}