import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import BrandsI from './types.ts';

import { brandsLines } from './static/brands.ts';

class Brands extends Default<BrandsI['props'], BrandsI['state']> implements BrandsI {
    parent: BrandsI['parent'];

    constructor(props: BrandsI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        return (
            <div ref={this.parent} className="indexBrands">
                <div className="indexBrands__lines">
                    {brandsLines.map((line, i) => (
                        <div className="indexBrands__line _ROW" key={i}>
                            <div className="indexBrands__lineMove _ROW">
                                <div className="indexBrands__lineItems _ROW">
                                    {line.map((l) => (
                                        <div className="indexBrands__lineItem" key={l}>
                                            <div className="indexBrands__lineBrand">
                                                <img
                                                    src={require(
                                                        `@/src/media/index/brands/${l}.svg`,
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="indexBrands__lineItems _fake _ROW">
                                    {line.map((l) => (
                                        <div className="indexBrands__lineItem" key={l}>
                                            <div className="indexBrands__lineBrand">
                                                <img
                                                    src={require(
                                                        `@/src/media/index/brands/${l}.svg`,
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Brands;
